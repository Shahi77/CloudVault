import jwt from "jsonwebtoken";

const generateToken = (userId, isAccessToken) => {
  let token;
  if (isAccessToken) {
    token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
  } else {
    token = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
  }
  return token;
};

export { generateToken };
