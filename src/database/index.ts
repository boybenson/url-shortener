import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({});

const connectDb = async () => {
  const connection = await mongoose.connect(process.env.DATABASE_URI);
  if (connection) {
    console.log("Connected to MongoDB");
    return true;
  } else {
    return false;
  }
};

export default connectDb;
