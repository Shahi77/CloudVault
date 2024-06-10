import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { EMAIL_REGEX } from "../constants.js";
import { User } from "../models/users.model.js";
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
  const { fullName, email, password } = req.body;
  if (
    [fullName, email, password].some(
      (field) => field == null || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "Full name, email & Password are required fields");
  }

  if (!EMAIL_REGEX.test(email)) {
    throw new ApiError(400, "Enter a valid email");
  }

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    throw new ApiError(409, "User with email already exists");
  }

  const user = await User.create({
    fullName: fullName,
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
          fullName: user.fullName,
          email: user.email,
        },
        "User registered successfully"
      )
    );
});

const handleLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if ([email, password].some((field) => field == null || field.trim() === "")) {
    throw new ApiError(400, "Please enter an email and password to login");
  }

  if (!EMAIL_REGEX.test(email)) {
    throw new ApiError(400, "Enter a valid email");
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Wrong password");
  }

  const { accessToken, refreshToken } = generateAccessAndRefreshTokens(
    user._id
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, AUTH_COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, AUTH_COOKIE_OPTIONS)
    .json(
      new ApiResponse(
        {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
        },
        "Logged in successfully"
      )
    );
});

export { handleSignup, handleLogin };
