import jwt from "jsonwebtoken"


export const generateToken = (user) => {
  try {
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1d" })
    return token;
  } catch (error) {
    console.log("error occured while generating token" + error)
  }
}

export const verifyToken = (token) => {
  try {
    const isVerified = jwt.verify(token, process.env.JWT_SECRET);
    return isVerified
  } catch (error) {
    console.log("error occured while verifying token" + error)
  }
}
