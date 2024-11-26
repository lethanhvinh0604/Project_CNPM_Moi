import express from 'express'
import dondathangController from '../controllers/dondathangController.js'
import authController from '../controllers/authController.js'

const dondathangRouter = express.Router()

dondathangRouter
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    dondathangController.getAllDonDatHang
  )
  .post(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    dondathangController.create
  )


dondathangRouter
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    dondathangController.getDonDatHangByID
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    dondathangController.updateDonDatHang
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    dondathangController.acceptOrRejectDonDatHang
  )

dondathangRouter
  .route('/:id/checkorder')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    dondathangController.checkOrder
  )
export default dondathangRouter
