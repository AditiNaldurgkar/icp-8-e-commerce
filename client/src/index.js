import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import NotFound from "./views/404";
import Dashboard from "./views/Dashboard";
import Home from "./views/Home";
import Login from "./views/Login";
import Signup from "./views/Signup";
import UserOrders from "./views/UserOrders";
import Cart from "./views/Cart";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/user/orders",
    element: <UserOrders />,
  },
  {
    path: "/user/cart",
    element: <Cart />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

root.render(
  <div className="bg-zinc-100 min-h-screen">
    <RouterProvider router={router} />
  </div>
);
