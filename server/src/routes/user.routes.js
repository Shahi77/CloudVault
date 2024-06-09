import { Router } from "express";
import { authLimiter } from "../config/rateLimit.config.js";
import { handleLogin, handleSignup } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/signup", authLimiter, handleSignup);
userRouter.post("/login", handleLogin);

export default userRouter;
