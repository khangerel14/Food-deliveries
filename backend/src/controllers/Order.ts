import { OrderModel } from "../models/Order";
import { Request, Response } from "express";

const createOrder = async (req: Request, res: Response) => {
    try {
        const table = await OrderModel.create(req.body)
        console.log(table);
        
        return res.status(201).send({ success: true, table})
    } catch (error) {
        res.status(400).send({ success: false })
    }
}

const getAllOrder = async (_: Request, res: Response) => {
    try {
        const table = await OrderModel.find()
        res.status(200).send( table )
    } catch (error) {
        res.status(500).send({ success: false })
    }
}

const getOrderById = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const table = await OrderModel.findById( id )
    } catch (error) {
        res.status(500).send({ success: false })
    }
}

const updateById = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const table = await OrderModel.findByIdAndUpdate( id )
    } catch (error) {
        res.status(500).send({ success: false }) 
    }
}

const deleteById = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const table = await OrderModel.findByIdAndDelete( id )
    } catch (error) {
        res.status(500).send({ success: false })         
    }
}


export { createOrder, getAllOrder, getOrderById, updateById, deleteById }