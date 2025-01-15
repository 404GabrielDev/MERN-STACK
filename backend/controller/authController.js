import { User } from "../models/userschema.js";
import {catchAsync} from '../utils/catchAsync.js'
import appError from "../utils/appError.js";
import { generateOtp } from "../utils/generateOtp.js";
import sendEmail from "../utils/email.js";


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
    
    res.json({
        status:"Success",
        message:"Usuario registrado com sucesso!"
    })
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