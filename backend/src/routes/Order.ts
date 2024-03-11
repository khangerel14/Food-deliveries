import express from "express";
import { createOrder, deleteById, getAllOrder, getOrderById, updateById } from "../controllers/Order";

const order = express.Router();

order.route('/').post(createOrder).get(getAllOrder).get(getOrderById);
order.route('/').delete(deleteById).put(updateById)

export { order }