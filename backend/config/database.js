import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config({path:"../config/.env"})

const connectDb=()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{console.log("Connected to MongoDb");})
    .catch((error)=>{console.log(error);})
}

export default connectDb