import express from "express";
import { getAllCategories, registerNewCategory } from "../controller/categoryController.js";


const router = express.Router()
router.post("/register", registerNewCategory)
router.get("/all", getAllCategories)

const categoryRouter = router

export default categoryRouter;
