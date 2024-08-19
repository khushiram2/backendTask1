import User from "../models/userModel.js"
import { generateToken } from "../utils/tokenUtils.js"
import { verifyPassword } from "../utils/bcryptUtils.js"

export const registerNewUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = await User.create({ name: name, email, email, password: password })
    const userRegistred = user.toObject()
    delete userRegistred.password;
    console.log(userRegistred)
    const token = generateToken(userRegistred)
    res.status(200).send({ message: "user registered sucessfully", user: userRegistred, token: token })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "internal server error" })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const userFromDb = await User.findOne({ email: email })
    console.log(userFromDb)
    const user = userFromDb.toObject()
    console.log(user)
    if (!user) {
      res.status(201).send({ message: "invalid credentials" })
      return;
    }
    const isMAtch = await verifyPassword(password, user.password)
    if (!isMAtch) {
      res.status(201).send({ message: "invalid credentials" })
      return;
    }

    delete user.password
    const token = generateToken(user);
    res.status(200).send({ message: "user loggedin sucessfully", user: user, token: token })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "internal server error" })
  }
}


