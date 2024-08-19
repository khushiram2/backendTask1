import express from "express"
import { registerNewUser, login } from "../controller/authcontroller.js"


const router = express.Router();
//TODO:write and import functions from authController for respective endPoint
router.post("/register", registerNewUser)
router.post("/login", login)

const authRoutes = router;


export default authRoutes;




