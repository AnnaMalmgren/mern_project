import { Strategy as LocalStrategy } from 'passport-local'
import { CustomError } from '../../models/customError.js'
import passport from 'passport'
import User from '../../models/user.js'
import bcrypt from 'bcryptjs'

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    async (email, password, done) => {
      try {
        if (!email || !password)
          throw new CustomError('Missing Credentials', 400)

        const user = await User.findOne({ email: email })
        if (!user) throw new CustomError('User not found', 404)

        const isMatch = await user.checkPassword(password)

        return isMatch ? done(null, user) : done(null, false)
      } catch (err) {
        done(err, null)
      }
    }
  )
)
