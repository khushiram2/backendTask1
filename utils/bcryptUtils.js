import bcrypt from "bcryptjs"


export const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword;
  } catch (error) {
    console.log("some error occured while hashing " + error)
  }
}

export const verifyPassword = async (originalPAssword, hashedPassword) => {
  try {
    const verifiedPassword = await bcrypt.compare(originalPAssword, hashedPassword);
    return verifiedPassword;
  } catch (error) {
    console.log("error occured while verifying password", + error)
  }
}
