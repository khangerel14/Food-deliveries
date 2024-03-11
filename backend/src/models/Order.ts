import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    orderNumber: Number,
    foods: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'food'
    }],
    totalPrice: {
        type: Number,
        int: Number
    },
    payment: {
        type: String,
        enum: ['not paid', 'paid'],
        default: 'Not paid'
    },
    process: String,
    createdDate: Date,
    district: String,
    Khoroo: String,
    Apartment: String
})

const OrderModel = mongoose.model('order', OrderSchema)

export { OrderModel }