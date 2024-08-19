import { verifyToken } from "../utils/tokenUtils"



export const verifyTokenFromHeaders = (req, res, next) => {
  try {
    const token = req.headers.authorization
    const tokenVerified = verifyToken(token)
    if (!tokenVerified) {
      res.status(401).send({ message: "request not authorised" })
      return;
    }
    next()
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "internal server error" })
  }
}
