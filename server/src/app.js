import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import v1Router from "./routes/version1.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use("/v1", v1Router);

export { app };
