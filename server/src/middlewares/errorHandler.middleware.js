import { CustomError } from '../models/customError.js'

const handleError = (err, req, res, next) => {
  let customError = err

  if (!(err instanceof CustomError)) {
    return next(err)
  }

  return res.status(customError.status).json({ message: customError.message })
}

export default handleError
