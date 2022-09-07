import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import validator from 'validator'

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator: validator.normalizeEmail,
      validator: validator.isEmail,
      message: 'Invalid email',
      isAsync: false,
    },
    validate: {
      validator: async (value) => {
        const user = await User.findOne({ email: value })
        return !user
      },
      message: 'User already exists',
      isAsync: true,
    },

    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [6, 'The password must contain at least 6 characters'],
    select: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

UserSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password') || user.isNew) {
    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash
    next()
  } else {
    return next()
  }
})

UserSchema.methods.checkPassword = async function (password) {
  const user = await User.findOne({ _id: this._id }).select('password').exec()
  return bcrypt.compare(password, user.password)
}

const User = mongoose.model('User', UserSchema)
export default User
