//import some library
import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'

// Import routes
import adminRouter from './routes/adminRouter.js'
import nhacCongRouter from './routes/nhacCongRouter.js'
import hoiTruongRouter from './routes/hoiTruongRouter.js'
import systemRouter from './routes/system.js'
import thiepRouter from './routes/thiepRouter.js'
import mcRouter from './routes/mcRouter.js'
import comboRouter from './routes/comboRouter.js'
import dondathangRouter from './routes/dondathangRouter.js'
import khachhangRouter from './routes/khachhangRouter.js'
import openaiRouter from './routes/openaiRouter.js'

const app = express()

// Cấu hình CORS
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Middleware log thời gian xử lý request
app.use((req, res, next) => {
  const start = Date.now()
  res.on('finish', () => {
    const duration = Date.now() - start
    console.log(`Request to ${req.originalUrl} took ${duration}ms`)
  })
  next()
})

// Use routes
app.use('/api/admin', adminRouter) // All admin routes will have a prefix of /ad
app.use('/api/nhaccong', nhacCongRouter) // All nhaccong routes will have a prefix of /nhaccong
app.use('/api/hoitruong', hoiTruongRouter)
app.use('/api/system', systemRouter)
app.use('/api/thiep', thiepRouter)
app.use('/api/mc', mcRouter)
app.use('/api/combo', comboRouter)
app.use('/api/dondathang', dondathangRouter)
app.use('/api/khachhang', khachhangRouter)
app.use('/api/openai', openaiRouter)

export default app
