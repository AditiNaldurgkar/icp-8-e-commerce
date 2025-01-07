import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Button from "../components/Button";
import Input from "../components/Input";
import { Link } from "react-router-dom";

function Signup() {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    rePassword: "",
  });

  const [error, setError] = useState("");

  const processSignup = async () => {
    toast.loading("Please wait...");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/signup`,
        signupData
      );
      toast.dismiss();

      toast.success(response.data.message);

      setSignupData({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        rePassword: "",
      });

      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);

    } catch (err) {
      toast.dismiss();
      setError(err?.response?.data?.message);
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div className="bg-zinc-100 min-h-screen flex flex-col items-center justify-center px-5">
      <h1 className="text-3xl mb-4 text-gray-600">Signup</h1>

      <div className="w-full md:w-[450px] bg-white rounded-2xl shadow-lg hover:shadow-xl px-10 py-6">
        <Input
          label={"Name"}
          val={signupData.name}
          onChange={(val) => {
            setSignupData({ ...signupData, name: val });
            setError("");
          }}
        />

        <Input
          label={"Email"}
          val={signupData.email}
          onChange={(val) => {
            setSignupData({ ...signupData, email: val });
            setError("");
          }}
        />

        <Input
          label={"Phone"}
          val={signupData.phone}
          onChange={(val) => {
            setSignupData({ ...signupData, phone: val });
            setError("");
          }}
        />

        <Input
          label={"Address"}
          val={signupData.address}
          onChange={(val) => {
            setSignupData({ ...signupData, address: val });
            setError("");
          }}
        />

        <Input
          label={"Password"}
          type="password"
          val={signupData.password}
          onChange={(val) => {
            setSignupData({ ...signupData, password: val });
            setError("");
          }}
        />

        <Input
          label={"Re-enter Password"}
          val={signupData.rePassword}
          type="password"
          onChange={(val) => {
            setSignupData({ ...signupData, rePassword: val });
            setError("");
          }}
        />

        <p className="text-red-500 text-xs mt-2">{error}</p>

        <p>
          Already have an account?{" "} <Link to="/login" className="text-blue-500">Login</Link>
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
            label="Signup"
            onClick={() => processSignup()}
            variant={"primary"}
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Signup;
