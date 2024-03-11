import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    foodIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'food',
        require: true
    }]
})

const CategoryModel = mongoose.model('category', CategorySchema)

export { CategoryModel }