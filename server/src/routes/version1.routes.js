import { Router } from "express";
import userRouter from "./user.routes.js";
import filesRouter from "./files.routes.js";

const v1Router = Router();

v1Router.use("/user", userRouter);
v1Router.use("/files", filesRouter);

export default v1Router;
