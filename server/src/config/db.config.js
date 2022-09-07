import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config({ path: '../.env' })

// mongoose options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
}

mongoose.connect(process.env.DB_CONNECTION_URL, options)
const db = mongoose.connection
db.on('error', (err) => {
  console.error(`MongoDB Error: ${err.message}`)
})
db.once('connected', () => {
  console.log('MongoDB Connected')
})

export default db
