//import express framework (bắt buộc)
import express from 'express'
import authController from '../controllers/authController.js'
import adminController from '../controllers/adminController.js'

const adminRouter = express.Router()

adminRouter.route('/count-active').get(adminController.getCount)
adminRouter.route('/most-booked').get(adminController.getMostBookedServices)

adminRouter
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    adminController.getByID
  )

export default adminRouter
