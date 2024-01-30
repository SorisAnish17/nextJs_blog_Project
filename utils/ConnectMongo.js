import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.Mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    return true;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};

export default connectMongo;
