import jwt from "jsonwebtoken";
import axios from "axios";
import { User } from "../models/users.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const verifyToken = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized Request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?.userId).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const refreshToken =
        req.cookies?.refreshToken ||
        req.header("Authorization")?.replace("Bearer ", "");

      if (!refreshToken) {
        throw new ApiError(401, "Unauthorized Request");
      }

      try {
        const response = await axios.post(
          `${process.env.BASE_URL}/api/v1/user/refresh-tokens`,
          null,
          { withCredentials: true }
        );

        const accessToken = response.data.accessToken;
        const decodedToken = jwt.verify(
          accessToken,
          process.env.ACCESS_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken.userId);
        if (!user) {
          throw new ApiError(401, "Unauthorized request");
        }

        req.user = user;
        next();
      } catch (error) {
        throw new ApiError(401, "Unable to refresh access token");
      }
    } else {
      throw new ApiError(401, error.message || "Invalid access token");
    }
  }
});

export default verifyToken;
