import { validationResult } from 'express-validator'
import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      })
    }

    let newUser = new User({
      email: req.body.email,
      password: req.body.password,
    })

    bcrypt.genSalt(12, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err
        newUser.password = hash
        newUser = await newUser.save()
        res.status(201).json({ ...newUser })
      })
    })
  } catch (err) {
    next(err)
  }
}

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body

    console.log(req.body)

    const user = await User.findOne({ email: email })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(404).json({ message: 'User not found' })
    }

    var token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )
    res.status(200).json({
      message: 'success',
      token: 'Bearer ' + token,
    })
  } catch (err) {
    next(err)
  }
}
