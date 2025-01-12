import { User } from "../models/userschema.js";
import {catchAsync} from '../utils/catchAsync.js'
import appError from "../utils/appError.js";

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