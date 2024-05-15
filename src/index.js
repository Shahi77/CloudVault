import { app } from "./app.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
