import jwt from 'jsonwebtoken'
import { catchAsync } from '../utils/catchAsync.js'
import appError from '../utils/appError.js'
import { User } from '../models/userschema.js'

const isAuthenticated = catchAsync(async(req, res, next) => {
    if(!token) {
        return next(new appError("Você não está logado. Por favor, logue para ter acesso", 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const currentUser = await User.findById(decoded.id)

    if(!currentUser) {
        return next(new appError("O usuario deste token não existe", 401));

        req.user = currentUser
        next()
    }
})

export default isAuthenticated;