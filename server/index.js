import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
dotenv.config();

import {
  getOrderById,
  getOrdersByUserId,
  postOrders,
  putOrders,
} from "./controllers/order.js";
import { postPayments } from "./controllers/payment.js";
import { getProdcuts, postProducts } from "./controllers/product.js";
import { postLogin, postSignup } from "./controllers/user.js";
import {
  checkRoleMiddleware,
  jwtVerifyMiddleware,
} from "./middlewares/auth.js";

import { responder } from "./utils/utils.js";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "test secret",
    cookie: { maxAge: 1000 * 60 * 60, httpOnly: false, secure: false },
  })
);

// Connect to MongoDB
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);

  if (conn) {
    console.log(`MongoDB connected successfully`);
  }
};

app.get("/health", jwtVerifyMiddleware, (req, res) => {
  return responder(res, true, "Server is running");
});

// Auth
app.post("/signup", postSignup);
app.post("/login", postLogin);

// Product
app.post("/products", jwtVerifyMiddleware, checkRoleMiddleware, postProducts);
app.get("/products", getProdcuts);

// Orders
app.post("/orders", jwtVerifyMiddleware, postOrders);
app.put("/orders/:id", jwtVerifyMiddleware, putOrders);
app.get("/orders/:id", jwtVerifyMiddleware, getOrderById);
app.get("/orders/user/:id", jwtVerifyMiddleware, getOrdersByUserId);

// Payments
app.post("/payments", postPayments);

app.use("*", (req, res) => {
  return responder(res, false, "API endpoint doesn't exist", null, 404);
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
