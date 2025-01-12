import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {errorHandler} from './controller/errorController.js'
import authRoutes from './routes/authRoutes.js'

const app = express()

app.use(cookieParser())

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
}))

app.use(express.json({limit:'20kb'}))

//Users

app.use('/api/users', authRoutes)

//Users api urls
app.all("*", (req, res, next) => {
    next(new appError(`Cant find ${req.originalUrl} on this server!`, 404))
})

app.use(errorHandler)


export default app