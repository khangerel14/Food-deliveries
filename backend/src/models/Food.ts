import mongoose from "mongoose";
import { category } from "../routes/Category";

const FoodSchema = new mongoose.Schema({
    name: String,
    image: {
        type: String,
        require: true
    },
    ingredients: String,
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    categoryName: {
        type: String
    }
})

const FoodModel = mongoose.model('food', FoodSchema)

export { FoodModel }