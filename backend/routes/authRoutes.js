import express from 'express'
import { login, registrar, resetPassword } from '../controller/authController.js'
import {forgetPassword} from '../controller/authController.js'

const router = express.Router()

router.post('/registrar', registrar)
router.post('/login', login)
router.post('/forget-password', forgetPassword)
router.post('/reset-password', resetPassword)

export default router