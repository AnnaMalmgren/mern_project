import User from '../../models/user.js'

export const registerSchema = {
  password: {
    isLength: {
      errorMessage: 'Password should be at least 7 chars long',
      options: { min: 7 },
    },
    errorMessage:
      'Password must be greater than 6 and contain at least one uppercase letter, one lowercase letter, and one number',
  },
  email: {
    normalizeEmail: true,
    isEmail: {
      errorMessage: 'Password should be at least 7 chars long',
    },
    custom: {
      options: async (value) => {
        const user = await User.find({ email: value })
        if (user.length > 0) {
          return 'The email address is already registered'
        }
      },
    },
  },
}
