import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  name: String,
  url: String
});

export default mongoose.model("Image", imageSchema);
