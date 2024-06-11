import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  getCloudinaryPublicId,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { File } from "../models/files.model.js";

const handleUploadFile = asyncHandler(async (req, res) => {
  const localFilePath = req.file?.path;
  const { fileName } = req.body;
  const user = req.user;
  if (!localFilePath || !fileName) {
    throw new ApiError(400, "Please add both file and file name to save");
  }

  const cloudinaryFile = await uploadOnCloudinary(localFilePath);
  if (!cloudinaryFile.url) {
    throw new ApiError(500, "Error while uploading file to cloud");
  }

  const cloudinaryId = getCloudinaryPublicId(cloudinaryFile.url);

  const dbEntry = await File.create({
    name: fileName,
    fileId: cloudinaryId,
    fileUrl: cloudinaryFile.url,
    owner: user._id,
  });

  if (!dbEntry) {
    throw new ApiError(500, "Error while uploading the file");
  }

  return res.status(201).json(
    new ApiResponse(
      {
        name: dbEntry.name,
        fileUrl: dbEntry.fileUrl,
        fileId: dbEntry.fileId,
      },
      "file uploaded successfully"
    )
  );
});

export { handleUploadFile };
