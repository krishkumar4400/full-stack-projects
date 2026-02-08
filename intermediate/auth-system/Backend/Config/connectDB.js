import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        mongoose.connection.on('connected', ()=>console.log("Database Connected Successfully"));
        await mongoose.connect(process.env.MONGO_URI, {dbName: "MERN_AUTHENTICATION"});
    } catch (error) {
        console.log(`Error while connecting with database: ${error.message}`);
    }
}