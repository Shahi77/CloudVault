import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/connect.js";
dotenv.config({
  path: "./.env",
});
connectDB();
app.listen(process.env.PORT || 8000, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
