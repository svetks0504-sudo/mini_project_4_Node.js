import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db_uri = process.env.DB_URI || "uri";

async function connectDB(db_uri) {
    try{
        await mongoose.connect(db_uri);
        console.log(`Connected to MongoDb at ${db_uri}`)
    }catch(error){
        console.error(`Error: ${error.message}`);
    }
}

export default connectDB;