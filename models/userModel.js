import mongoose from "mongoose"
import { hashPassword } from "../utils/bcryptUtils.js"
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }

}, { timestamps: true })

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await hashPassword(this.password)
    }
  } catch (error) {
    console.log(error)
    return;
  }
  next()
})


const User = mongoose.model("user", userSchema)

export default User;
