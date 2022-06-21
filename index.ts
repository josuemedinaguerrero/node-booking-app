import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import coockieParser from "cookie-parser";
import cors from "cors";
import { ErrorRequestHandler } from "./types";

dotenv.config();

import { authRoute, hotelsRoute, roomsRoute, usersRoute } from "./routes";

const app = express();

const connect = async () => {
   try {
      await mongoose.connect(process.env.MONGODB as string);
      console.log("Connected to backend.");
   } catch (error) {
      throw error;
   }
};

mongoose.connection.on("disconnected", () => {
   console.log("MongoDB disconnected");
});

mongoose.connection.on("connected", () => {
   console.log("MongoDB connected");
});

// Middlewares
app.use(coockieParser());
app.use(cors());
app.use(express.json());

// app.use(( _req, _res, next ) => {
//    console.log('Hello from middleware');
//    next();
// })

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
   const errorStatus = err.status || 500;
   const errorMessage = err.message || "Something went wrong";
   return res.status(500).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
   });
};
app.use(errorHandler);

app.get("/", (_req, res) => {
   res.send("Hello, first request");
});

app.listen(process.env.PORT, () => {
   connect();
});
