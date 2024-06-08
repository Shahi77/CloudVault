import cloudinary from "../config/cloudinary.js";
import fs from "fs";

const uploadOnCloudinary = async (localFilePath, isAvatar) => {
  try {
    if (!localFilePath) {
      return null;
    }
    let response;
    if (isAvatar) {
      response = await cloudinary.uploader.upload(localFilePath, {
        folder: "cloud-vault/avatars",
        resource_type: "auto",
      });
    } else {
      response = await cloudinary.uploader.upload(localFilePath, {
        folder: "cloud-vault/files",
        resource_type: "auto",
      });
    }

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove the locally saved temp file which failed to upload
    console.log(`Error while uploading file: ${error}`);
  }
};

const deleteFileOnCloudinary = async (cloudinaryId, isAvatar) => {
  try {
    if (isAvatar) {
      await cloudinary.uploader.destroy(`cloud-vault/avatars/${cloudinaryId}`);
    } else {
      await cloudinary.uploader.destroy(`cloud-vault/files/${cloudinaryId}`);
    }
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
