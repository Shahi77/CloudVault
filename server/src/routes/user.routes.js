import { Router } from "express";
import { authLimiter } from "../config/rateLimit.config.js";
import {
  handleLogin,
  handleRefreshTokens,
  handleSignup,
  handleCheckAuth,
} from "../controllers/user.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post("/signup", authLimiter, handleSignup);
userRouter.post("/login", handleLogin);
userRouter.post("/refresh-tokens", handleRefreshTokens);
userRouter.get("/check-auth", verifyToken, handleCheckAuth);

export default userRouter;
