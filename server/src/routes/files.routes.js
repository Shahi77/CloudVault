import { Router } from "express";
import {
  handleDeleteFile,
  handleGetAllFiles,
  handleUploadFile,
} from "../controllers/files.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import verifyToken from "../middlewares/auth.middleware.js";

const filesRouter = Router();

filesRouter.post(
  "/upload",
  verifyToken,
  upload.single("uploadedFile"),
  handleUploadFile
);

filesRouter.delete("/delete/:fileId", verifyToken, handleDeleteFile);
filesRouter.get("/", verifyToken, handleGetAllFiles);

export default filesRouter;
