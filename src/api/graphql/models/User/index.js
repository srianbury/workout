import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export { User };
