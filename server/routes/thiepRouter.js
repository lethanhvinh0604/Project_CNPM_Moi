import express from 'express'
import thiepController from '../controllers/thiepController.js'
import authController from '../controllers/authController.js'

const thiepRouter = express.Router()

thiepRouter
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    thiepController.getAllThiep
  )
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    thiepController.createThiep
  )

thiepRouter
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    thiepController.getThiep
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    thiepController.updateThiep
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    thiepController.deleteThiep
  )

export default thiepRouter
