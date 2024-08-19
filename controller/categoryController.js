import Category from "../models/categoriesModel.js"



export const registerNewCategory = async (req, res) => {
  try {
    const { name } = req.body
    const categoryRegistred = await Category.create({ name: name })
    res.status(200).send({ message: "category registered sucessfully", category: categoryRegistred })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "internal server error" })
  }
}

export const getAllCategories = async (req, res) => {
  try {
    const allCatgories = await Category.find({})
    res.status(200).send({ categories: allCatgories })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "internal server error" })
  }
}
