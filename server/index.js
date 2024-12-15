import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
dotenv.config();

import jwt from "jsonwebtoken";

import { postLogin, postSignup } from "./controllers/user.js";

const app = express();
app.use(express.json());
app.use(cors());

const jwtVerifyMiddleware = async(req, res, next) => {
  const jwtToken = req.headers.authorization.split(" ")[1];

  if (!jwtToken) {
    return res.status(401).json({
      success: false,
      message: "JWT token is missing",
    });
  }

  try{
    const decoded = await jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  }
  catch(error){
    return res.status(401).json({
      success: false,
      message: "Invalid JWT token",
    });
  }
}

// Connect to MongoDB
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);

  if (conn) {
    console.log(`MongoDB connected successfully`);
  }
};

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
  });
});

app.post("/signup", postSignup);
app.post("/login", postLogin);

app.post("/order", jwtVerifyMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Order placed successfully",
  });
});

app.post("/payment", jwtVerifyMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Payment successful",
  });
});


app.use("*", (req, res) => {
  res
    .status(404)
    .json({ success: false, message: "API endpoint doesn't exist" });
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
