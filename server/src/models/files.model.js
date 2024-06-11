import mongoose from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const fileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    fileId: {
      type: String,
      required: true,
      index: true,
    },
    fileUrl: {
      type: String, // cloudinary URL
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

fileSchema.plugin(aggregatePaginate);
export const File = mongoose.model("File", fileSchema);
