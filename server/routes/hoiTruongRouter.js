import express from 'express'
import hoiTruongController from '../controllers/hoiTruongController.js'
import authController from '../controllers/authController.js'

const hoiTruongRouter = express.Router()

hoiTruongRouter.route('/top').get(hoiTruongController.getTopHoiTruong)

hoiTruongRouter
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    hoiTruongController.getAll
  )
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    hoiTruongController.create
  )

hoiTruongRouter
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    hoiTruongController.getByID
  )

  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    hoiTruongController.update
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    hoiTruongController.deleteByID
  )

export default hoiTruongRouter
