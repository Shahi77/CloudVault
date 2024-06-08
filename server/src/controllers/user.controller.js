import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { EMAIL_REGEX } from "../constants.js";
import { User } from "../models/users.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { generateToken } from "../utils/jwt.js";
import { AUTH_COOKIE_OPTIONS } from "../config/cookies.config.js";

const generateAccessAndRefreshTokens = async (userId) => {
  const accessToken = generateToken(userId, true);
  const refreshToken = generateToken(userId, false);

  await User.updateOne(
    { _id: userId },
    {
      $set: { refreshToken },
    }
  );

  return { accessToken, refreshToken };
};

const handleSignup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (
    [username, email, password].some(
      (field) => field == null || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "Username, email & Password are required fields");
  }

  if (!EMAIL_REGEX.test(email)) {
    throw new ApiError(400, "Enter a valid email");
  }

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    throw new ApiError(409, "User with username or email already exists");
  }

  const user = await User.create({
    username: username,
    email: email,
    password: password,
  });

  if (!user) {
    throw new ApiError(500, "Error while registering the user");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  return res
    .status(201)
    .cookie("accessToken", accessToken, AUTH_COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, AUTH_COOKIE_OPTIONS)
    .json(
      new ApiResponse(
        {
          id: user._id,
          username: user.username,
          email: user.email,
        },
        "User registered successfully"
      )
    );
});

const handleLogin = asyncHandler(async (req, res) => {
  console.log(`login is working fine`);
});

export { handleSignup, handleLogin };
