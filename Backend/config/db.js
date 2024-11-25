import mongoose from "mongoose";

// mongoose.connect(MONGO_URI)
//   .then(() => console.log('MongoDB Connected'))
//   .catch((err) => console.error('MongoDB Connection Error:', err));


const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1); // Exit on failure
  }
};

export default connectDB;