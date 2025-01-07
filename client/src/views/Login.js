import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const processLogin = async () => {
    toast.loading("Please wait...");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        loginData
      );

      localStorage.setItem("e-commerce-user-token", response.data.token);

      toast.dismiss();

      toast.success(response.data.message);

      setLoginData({
        email: "",
        password: "",
      });

       setTimeout(() => {
         window.location.href = "/dashboard";
       }, 3000);
    } catch (err) {
      toast.dismiss();
      setError(err?.response?.data?.message);
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div className="bg-zinc-100 min-h-screen flex flex-col items-center justify-center px-5">
      <h1 className="text-3xl mb-4 text-gray-600">Login</h1>

      <div className="w-full md:w-[450px] bg-white rounded-2xl shadow-lg hover:shadow-xl px-10 py-6">
        <Input
          label={"Email"}
          val={loginData.email}
          onChange={(val) => {
            setLoginData({ ...loginData, email: val });
            setError("");
          }}
        />

        <Input
          label={"Password"}
          type="password"
          val={loginData.password}
          onChange={(val) => {
            setLoginData({ ...loginData, password: val });
            setError("");
          }}
        />

        <p className="text-red-500 text-xs mt-2">{error}</p>

        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Signup
          </Link>
        </p>

        <div className="flex justify-around mt-6">
          <Button
            label="Cancel"
            onClick={() => {
              window.location.href = "/";
            }}
            variant={"danger"}
          />

          <Button
            label="Login"
            onClick={() => processLogin()}
            variant={"primary"}
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Login;
