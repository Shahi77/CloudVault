import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  deleteFileOnCloudinary,
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

const handleDeleteFile = asyncHandler(async (req, res) => {
  const { fileId } = req.params;
  const user = req.user;

  if (!fileId) {
    throw new ApiError(400, "Please pass a file id to delete");
  }

  const file = await File.findOne({ fileId: fileId });
  if (!file) {
    throw new ApiError(404, "No such file found");
  }

  if (file.owner.toString() !== user._id.toString()) {
    throw new ApiError(401, "Unauthorized Request");
  }

  await deleteFileOnCloudinary(fileId);

  await File.deleteOne({ fileId: fileId });

  return res
    .status(200)
    .json(new ApiResponse({ fileId: fileId }, "File deleted successfully"));
});

const handleGetAllFiles = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const files = await File.find({ owner: user._id })
    .select("-updatedAt")
    .sort({ createdAt: 1 });

  return res
    .status(200)
    .json(new ApiResponse({ files }, "files fetched successfully"));
});

export { handleUploadFile, handleDeleteFile, handleGetAllFiles };
