import express from 'express'

import { registerUser } from '../controllers/auth.js'
import { loginUser } from '../controllers/auth.js'
import { registerSchema } from '../validation/user/register.js'
import { checkSchema } from 'express-validator'

const router = express.Router()

router.post('/signup', checkSchema(registerSchema), registerUser)
router.post('/login', loginUser)

export default router
