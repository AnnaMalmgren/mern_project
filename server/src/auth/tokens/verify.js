import UserToken from '../../models/userToken.js'
import jwt from 'jsonwebtoken'

const verifyRefreshToken = async (refreshToken) => {
  const privateKey = process.env.REFRESH_TOKEN_SECRET

  currentToken = await UserToken.findOne({ token: refreshToken })
  if (!currentToken) throw new Error('Invalid refresh token')

  jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
    if (err) throw new Error('Invalid refresh token')

    return tokenDetails
  })
}

export default verifyRefreshToken
