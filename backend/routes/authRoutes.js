import express from 'express'
import { login, registrar } from '../controller/authController.js'
import {forgetPassword} from '../controller/authController.js'

const router = express.Router()

router.post('/registrar', registrar)
router.post('/login', login)
router.post('/forget-password', forgetPassword)

export default router