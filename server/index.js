import connectMongo from './connMongo.js'
import app from './app.js'

// Start the server
connectMongo()
const port = 3000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})
