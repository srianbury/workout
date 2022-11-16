import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: String, // the uid provided by firebase auth
    username: {
      type: String,
      unique: true,
    },
    email: String,
    picture: String,
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export { User };
