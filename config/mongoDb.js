import mongoose from "mongoose";
import { MONGO_URL } from "./env.js";

export const connectDB = () => {
    mongoose.connect(MONGO_URL).then(() => {
        console.log('Database connected');
    }).catch(err => {
        throw err;
    });
}