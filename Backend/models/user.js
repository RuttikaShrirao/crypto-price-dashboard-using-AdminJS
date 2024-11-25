import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  icon: String,
  Coin_Name: String,
  Price: Number,
});

export default mongoose.model("User", UserSchema);
