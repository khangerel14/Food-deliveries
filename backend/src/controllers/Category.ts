import { Request, Response } from "express";
import { CategoryModel } from "../models/Category";

const newCategory = async (req: Request, res: Response) => {
    try {
        const table = await CategoryModel.create(req.body)
        return res.status(201).send({ success: true, table })
    } catch (error) {
        res.status(500).send(error)
    }
}

const getAllCategory = async (req: Request, res: Response) => {
    try {
        const table = await CategoryModel.find(req.body)
        return res.status(200).send({ success: true, table })
    } catch (error) {
        res.status(500).send(error)
    }
}

const getCategory = async (req: Request, res: Response) => {
    const { name } = req.body
    try {
        const table = await CategoryModel.findOne({ name: name }).populate("foodId")
        console.log({ success: true, table });
    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteOneCategory = async (req: Request, res: Response) => {
    try {
        const deleteCategoryById = req.params.id
        const deleteCategory = await CategoryModel.findByIdAndDelete(deleteCategoryById)
        res.status(200).send({ success: true, deleteCategory })
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateOneCategory = async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
        const updateCategoryById = req.params.id
        const updateCategory = await CategoryModel.findByIdAndUpdate(updateCategoryById, { name: name})
        res.status(200).send({ success: true, updateCategory})
    } catch (error) {
        res.status(500).send(error)
    }
}

export { updateOneCategory, deleteOneCategory, getAllCategory, getCategory, newCategory }