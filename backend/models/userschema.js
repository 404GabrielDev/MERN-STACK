import mongoose from "mongoose";
import validator from 'validator'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required: [true, 'por favor, forneça um username'],
        trim: true,
        minlength: 5,
        maxlength: 30,
        index: true,
    },

    email: {
        type: String,
        unique: true,
        required: true,
        isLowercase: true,
        validate:[validator.isEmail, "Por favor , forneça um email valido"]
    },

    password: {
        type: String,
        required: [true, "Por favor, forneça uma senha"],
        minlength: 8,
        select: false
    },

    passwordConfirm: {
        type: String,
        required: [true, "As senhas não coincidem!"],
        validator: function (el) {
            return el===this.password
        },
        message:"As senhas não coincidem"
    },

    isVerified: {
        type: Boolean,
        default: false,
    },

    otp: {
        type:String,
        default:null,
    },

    otpExpires: {
        type: Date,
        default:null
    },

    resetPasswordOTP: {
        type:String,
        default:null
    },

    resetPasswordOTPExpires: {
        type: Date,
        default: null,
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
}, {timestamps:true})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next()
        this.password = await bcrypt.hash(this.password, 10)

        this.passwordConfirm = undefined
        next()
})

userSchema.methods.correctPassword = async function(password, userPassword) {
    return await bcrypt.compare(password, userPassword)
}

export const User = mongoose.model("User", userSchema)