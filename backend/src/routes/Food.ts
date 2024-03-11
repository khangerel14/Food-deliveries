import express from "express";
import { getAllFood, newFood, updateFood, deleteFood, getFood } from "../controllers/Food";

const food = express.Router()

food.route('/newfood').post(newFood)
food.route('/getfood').get(getAllFood)
food.route('/getOne').get(getFood)
food.route('/').put(updateFood).delete(deleteFood)

export { food }