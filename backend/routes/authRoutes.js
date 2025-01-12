import express from 'express'
import { login, registrar } from '../controller/authController.js'

const router = express.Router()

router.post('/registrar', registrar)
router.post('/login', login)

export default router