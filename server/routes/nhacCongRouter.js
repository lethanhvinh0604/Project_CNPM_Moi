import express from 'express'
import nhacCongController from '../controllers/nhacCongController.js'
import authController from '../controllers/authController.js'

const nhacCongRouter = express.Router()

nhacCongRouter
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    nhacCongController.getAllNhacCong
  )
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    nhacCongController.createNhacCong
  )

nhacCongRouter
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    nhacCongController.getNhacCong
  )

  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    nhacCongController.updateNhacCong
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    nhacCongController.deleteNhacCong
  )

nhacCongRouter
  .route('/:id/rating')
  .patch(
    authController.protect,
    authController.restrictTo('user'),
    nhacCongController.rating
  )
export default nhacCongRouter
