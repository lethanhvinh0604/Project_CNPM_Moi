import express from 'express'
import mcController from '../controllers/mcController.js'
import authController from '../controllers/authController.js'

const mcRouter = express.Router();

mcRouter
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    mcController.getAllMC
  )
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    mcController.createMC
  );

mcRouter
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    mcController.getMC
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    mcController.updateMC
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    mcController.deleteMC
  );

mcRouter
  .route('/:id/rating')
  .patch(
    authController.protect,
    authController.restrictTo('user'),
    mcController.rating
  )
export default mcRouter;
