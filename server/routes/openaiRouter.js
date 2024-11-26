import express from 'express'
import openaiController from '../controllers/openaiController.js'

const openaiRouter = express.Router()

openaiRouter.get('/generate-text', openaiController.generateText)

export default openaiRouter
