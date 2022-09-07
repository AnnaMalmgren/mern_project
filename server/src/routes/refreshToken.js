import { Router } from 'express'
import UserToken from '../models/userToken.js'
import jwt from 'jsonwebtoken'
import verifyRefreshToken from '../auth/tokens/verify.js'

const router = Router()

// get new access token
router.post('/', async (req, res) => {
  const { error } = refreshTokenBodyValidation(req.body)
  if (error) return res.status(400).json({ error: true })

  verifyRefreshToken(req.body.refreshToken)
    .then(({ tokenDetails }) => {
      const payload = { _id: tokenDetails._id, email: tokenDetails.email }
      const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRE,
      })
      res.status(200).json({
        error: false,
        token,
      })
    })
    .catch((err) => res.status(400).json(err))
})

// logout
router.delete('/', async (req, res, next) => {
  try {
    const { error } = refreshTokenBodyValidation(req.body)
    if (error)
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message })

    const userToken = await UserToken.findOne({ token: req.body.refreshToken })
    if (!userToken)
      return res
        .status(200)
        .json({ error: false, message: 'Logged Out Sucessfully' })

    await userToken.remove()
    res.status(200).json({ error: false, message: 'Logged Out Sucessfully' })
  } catch (err) {
    next(err)
  }
})

export default router
