import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./router";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./swaggerCongfig";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(compression());
dotenv.config();

const server = http.createServer(app);

export const SERVER_PORT = process.env.SERVER_PORT;
if (!SERVER_PORT) {
  throw new Error("SERVER_PORT is not defined");
}

server.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on http://localhost:${process.env.SERVER_PORT}/`);
});

// Database Setup
const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
  throw new Error("MONGO_URL is not defined");
}

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("connected", () => {
  console.log("Successfully connected to the MongoDB database.");
});
mongoose.connection.on("error", (error: Error) => {
  console.log(error);
});

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routing
// All routes will be handled by the router module
app.use("/", router());
