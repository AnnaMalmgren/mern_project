import jwt from 'jsonwebtoken'
import UserToken from '../../models/userToken.js'

const generateTokens = async (user) => {
  const payload = { _id: user._id, email: user.email }
  const accessToken = jwt.sign({ payload }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRE,
  })

  const refreshToken = jwt.sign({ payload }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
  })

  const userToken = await UserToken.findById(user._id)
  if (userToken) await userToken.remove()

  await new UserToken({ userId: user._id, token: refreshToken }).save()
  return { accessToken, refreshToken }
}

export default generateTokens
