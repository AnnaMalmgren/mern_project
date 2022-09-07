import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import { corsOptions } from './config/cors.config.js'

import authRoutes from './routes/auth.js'
import refreshTokenRoutes from './routes/refreshToken.js'
import errorHandler from './middlewares/errorHandler.middleware.js'
import 'dotenv/config.js'
import './config/db.config.js'
import './auth/strategies/jwt.js'
import './auth/strategies/localSignup.js'
import './auth/strategies/localLogin.js'

const app = express()

app.use(helmet())
app.use(cors(corsOptions))

app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser(process.env.COOKIE_SECRET))

app.use(passport.initialize())

app.use('/api/auth', authRoutes)
app.use('/api/refreshToken', refreshTokenRoutes)

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' })
})

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`)
})
