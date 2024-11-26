//import express framework (bắt buộc)
import express from 'express'
import authController from '../controllers/authController.js'

const systemRouter = express.Router()

systemRouter.post('/login', authController.login)
systemRouter.post('/signup', authController.signup)
systemRouter.post('/reset-password', authController.resetPassword)
systemRouter.post('/change-password', authController.changePassword)

export default systemRouter
