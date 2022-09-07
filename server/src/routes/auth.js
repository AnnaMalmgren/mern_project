import express from 'express'
import passport from 'passport'
import { registerUser } from '../controllers/auth.js'
import { loginUser } from '../controllers/auth.js'

const router = express.Router()

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  registerUser
)
router.post(
  '/login',
  passport.authenticate('login', { session: false }),
  loginUser
)

export default router
