import { Strategy as LocalStrategy } from 'passport-local'
import passport from 'passport'
import User from '../../models/user.js'
import { CustomError } from '../../models/customError.js'

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    async (email, password, done) => {
      try {
        const user = await new User({
          email: email,
          password: password,
        }).save()

        return done(null, user)
      } catch (err) {
        done(new CustomError(err.message, 400), null)
      }
    }
  )
)
