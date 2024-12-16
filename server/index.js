import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
dotenv.config();


import { postLogin, postSignup } from "./controllers/user.js";
import {
  jwtVerifyMiddleware,
  checkRoleMiddleware,
} from "./middlewares/auth.js";
import {postProducts} from "./controllers/product.js";

const app = express();
app.use(express.json());
app.use(cors());

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

// Auth
app.post("/signup", postSignup);
app.post("/login", postLogin);

// Product
app.post("/products", jwtVerifyMiddleware, checkRoleMiddleware, postProducts);


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
