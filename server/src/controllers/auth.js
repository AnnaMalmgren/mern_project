import generateTokens from '../auth/tokens/generate.js'

export const registerUser = async (req, res, next) => {
  try {
    res.status(201).json({ ...req.user })
  } catch (err) {
    next(err)
  }
}

export const loginUser = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = await generateTokens(req.user)

    res.status(200).json({
      token: accessToken,
      refreshToken: refreshToken,
      error: false,
    })
  } catch (err) {
    next(err)
  }
}
