import { Router } from "express";
import { handleUploadFile } from "../controllers/files.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import verifyToken from "../middlewares/auth.middleware.js";

const filesRouter = Router();

filesRouter.post(
  "/upload",
  verifyToken,
  upload.single("uploadedFile"),
  handleUploadFile
);

export default filesRouter;
