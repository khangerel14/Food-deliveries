import express from "express"
import { getAllCategory, newCategory, getCategory, deleteOneCategory, updateOneCategory } from "../controllers/Category"

const category = express()

category.route("/").post(newCategory).put(updateOneCategory)
category.route("/").get(getAllCategory).get(getCategory).delete(deleteOneCategory)
category.route('/getOne').get(getCategory)

export { category }