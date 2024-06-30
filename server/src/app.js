import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import v1Router from "./routes/version1.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use("/api/v1", v1Router);

export { app };
