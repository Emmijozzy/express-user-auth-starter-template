import mongoose  from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const MONGO_URL = <string>process.env.MONGO_URL

const connectMongoDb = async() => {
  try {
    console.log("connecting to database........")
    await mongoose.connect(MONGO_URL)
    console.log("Database connected" )
  } catch (err) {
    throw "Error in connection to database"
  }
}

export default connectMongoDb