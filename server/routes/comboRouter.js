import express from 'express'
import comboController from '../controllers/comboController.js'
import authController from '../controllers/authController.js'

const comboRouter = express.Router()

comboRouter
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    comboController.getAll
  )
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    comboController.create
  )

comboRouter
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    comboController.getByID
  )

  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    comboController.update
  )

  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    comboController.deleteByID
  )

export default comboRouter
