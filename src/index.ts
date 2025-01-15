import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./router";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.json());
dotenv.config();

const server = http.createServer(app);

server.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on http://localhost:${process.env.SERVER_PORT}/`);
});

const MONGO_URL = process.env.MONGO_URL || "";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("connected", () => {
  console.log("Successfully connected to the MongoDB database.");
});
mongoose.connection.on("error", (error: Error) => {
  console.log(error);
});

app.use("/", router());
