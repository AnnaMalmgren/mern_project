import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'
import { corsOptions } from './config/cors.config.js'

import authRoutes from './routes/auth.js'
import 'dotenv/config.js'
import './config/db.config.js'

const app = express()

app.use(helmet())
app.use(cors(corsOptions))

app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`)
})
