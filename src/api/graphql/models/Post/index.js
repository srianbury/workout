import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: String,
    title: String,
    shortDescription: String,
    longDescription: String,
    media: {
      video: {
        source: String,
        id: String,
      },
      photo: String,
    },
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export { Post };
