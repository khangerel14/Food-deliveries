import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

export const connectDataBase = async () => {
    try {
        const MONGODB: string = process.env.MONGODB_URL || 'mongodb+srv://khangerel:khangerelapi123@delivery.qbz9ro4.mongodb.net/?retryWrites=true&w=majority'
        await mongoose.connect(MONGODB);
        console.log("DataBase connection successfull");
    } catch (error) {
        console.error(error)
        throw new Error('error')
    }
}