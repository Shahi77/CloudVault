import cloudinary from "../config/cloudinary.config.js";
import fs from "fs";

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: "cloud-vault/files",
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove the locally saved temp file which failed to upload
    console.log(`Error while uploading file: ${error}`);
  }
};

const deleteFileOnCloudinary = async (cloudinaryId) => {
  try {
    await cloudinary.uploader.destroy(`cloud-vault/files/${cloudinaryId}`);
  } catch (error) {
    console.log(`Error while deleting file: ${error}`);
  }
};

const getCloudinaryPublicId = (cloudinaryUrl) => {
  const arr = cloudinaryUrl.split("/");
  const fileName = arr[arr.length - 1];
  const publicId = fileName.split(".")[0];
  return publicId;
};

export { uploadOnCloudinary, deleteFileOnCloudinary, getCloudinaryPublicId };
