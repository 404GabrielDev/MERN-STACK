import { User } from "../models/userschema.js";
import {catchAsync} from '../utils/catchAsync.js'
import appError from "../utils/appError.js";
import { generateOtp } from "../utils/generateOtp.js";
import sendEmail from "../utils/email.js";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

//Criação de token
const signToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

//Gerando o token e enviando no corpo de resposta
const createSendToken = (User, statusCode, res, message) => {
    const token = signToken(User._id);

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN *24 *60 *60 *1000),
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'Lax'
    };

    res.cookie('token', token, cookieOptions);

    User.password=undefined;
    User.passwordConfirm=undefined;
    User.otp=undefined

    res.status(statusCode).json({
        status:'success',
        message:message,
        token,
        data: {
            user:User,
        }
    })
}

//Lógica de Registro
export const registrar = catchAsync(async (req, res, next) => {
    const {username, email, password, passwordConfirm} = req.body

    const existingUser = await User.findOne({email});

    if(existingUser) return next (new appError("Esse email já foi registrado!", 400));

    const newUser = await User.create({
        username,
        email,
        password,
        passwordConfirm,
    })

    createSendToken(newUser, 200, res, "Registrado com sucesso")

    req.user=newUser
})


//Lógica do Login
export const login = catchAsync(async(req, res, next) => {
    const {email, password} = req.body
    if(!email || !password) {
        return next(new appError("Por favor, forneça um email e uma senha.", 400))
    }

    const user = await User.findOne({email}).select("+password")

    //comparar senha salva com o banco de dados

    if(!user || !(await user.correctPassword(password, user.password))) {
        return next(new appError("Email ou senha incorretos", 401))
    }
    res.json({status:200, message:"Logado com sucesso"})
})

export const sendOtpEmail = catchAsync(async(req, res, next) => {
    const {email} = req.body

    if(!email) {
        return next(new appError("Por favor forneça um email", 400))
    }

    const user = await User.findOne({email})
    if(!user) {
        return next(new appError("Usuario não encontrado", 404))
    }

    const otp = generateOtp()
    const otpExpires = Date.now() + 5 * 60 * 1000; //5 minutos de validade

    user.otp = otp
    user.otpExpires = otpExpires
    await user.save({validateBeforeSave:false})

    //enviar o codico OTP para o email do usuário
    try {
        await sendEmail({
            email:user.email,
            subject:"Seu codico OTP para verificação da conta",
            html:`<h1>Seu codico OTP é : ${otp}</h1><p>Este codico é valido por 5 minutos.</p>,`
        });
        res.status(200).json({
            status:"success",
            message:"O codico OTP foi enviado para o seu email"
        })
    } catch (error) {
        //limpar o otp e a expiração , se houver erro ao enviar o email
        user.otp=undefined;
        user.otpExpires=undefined
        await user.save({validateBeforeSave:false})

        console.error("Erro ao enviar o códico OTP:", error);
        return next(new appError("Erro ao enviar o códico OTP. Tente novamente.", 500))
    }
})

//Verificando o email e o codico OTP
export const verifyEmailAccount = catchAsync(async(req, res, next) => {

    const {email, otp} = req.body
    
    //verificar se o email e otp estão presentes
    if(!email || !otp) {
        return next(new appError("Forneça um codico OTP e um email para a verificação", 400))
    }

    //buscar o usuario no banco de dados
    const user = await User.findOne({email});
    
    //verificar se o usuario existe
    if(!user) {
        return next(new appError("Usuario não encontrado", 400))
    }

    //validar se o codico otp corresponde
    if(user.otp !== otp) {
        return next(new appError("Codico OTP invalido", 400))
    }

    //verificar se o codico OTP expirou
    if(Date.now() > user.otpExpires) {
        return next(new appError("O codico OTP expirou, solicite um novo codico", 400))
    }

    //Marcar o usuario como verificado e limpar os campos relacionados ao OTP
    user.isVerified = true;
    user.otp = undefined
    user.otpExpires = undefined

    await user.save({validateBeforeSave:false})

    //enviar resposta de sucesso com o token ou mensagem de confirmação
    createSendToken(user, 200, res, "O email foi verificado com sucesso!")
    
})

//Lógica "esqueceu a senha?"
export const forgetPassword = catchAsync(async (req, res, next) => {
    const {email} = req.body
    const user = await User.findOne({email});

    if(!user) {
        return next(new appError("Usuario não encontrado", 404))
    }
    

    const otp = generateOtp()

    user.resetPasswordOTP=otp
    user.resetPasswordOTPExpires=Date.now() + 300000

    await user.save({validateBeforeSave:false});

    try {
        await sendEmail({
            email:user.email,
            subject:"Sua senha para redefinição (será valido por 5 min)",
            html:`<h1>Seu códico para redefinir: ${otp}`
        })

        res.status(200).json({
            status:'sucesso',
            message:'O codico para redefinição foi enviado ao seu email'
        })
    } catch(error) {
        user.resetPasswordOTP=undefined,
        user.resetPasswordOTPExpires=undefined,
        await user.save({validateBeforeSave:false})
        console.log("houve um erro ao enviar email", + error)
        return next(new appError("Houve um erro ao enviar o email, Por favor , tente novamente!", 400))
    }
})

//redefinir senha
export const resetPassword = catchAsync(async(req, res, next) => {
    const{email, otp, password, passwordConfirm} = req.body

    const user = await User.findOne({
        email,
        resetPasswordOTP:otp,
        resetPasswordOTPExpires:{$gt:Date.now()}
    })

    console.log(user)

    if(!user) return next(new appError("Nenhum usuario encontrado", 400))

    user.password=password
    user.passwordConfirm=passwordConfirm
    user.resetPasswordOTP=undefined
    user.resetPasswordOTPExpires=undefined
    
    await user.save()

    res.json({
        status:200,
        message:"Senha mudada com sucesso!"
    })
})