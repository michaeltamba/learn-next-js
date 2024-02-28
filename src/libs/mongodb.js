import mongoose from "mongoose";

const connectMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODBURL);
    console.log("connected  to MongoDB");
  } catch (err) {
    console.log(err);
  }
}

export default connectMongoDb