import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";

function Signup() {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    rePassword: "",
  });

  return (
    <div className="bg-zinc-100 min-h-screen flex flex-col items-center justify-center">
      <h1>Signup</h1>

      <div className="w-[450px] bg-white rounded-2xl shadow-lg hover:shadow-xl px-10 py-6">
        <Input
          label={"Name"}
          val={signupData.name}
          onChange={(val) => {
            setSignupData({ ...signupData, name: val });
          }}
        />

        <Input
          label={"Email"}
          val={signupData.email}
          onChange={(val) => {
            setSignupData({ ...signupData, email: val });
          }}
        />

        <Input
          label={"Phone"}
          val={signupData.phone}
          onChange={(val) => {
            setSignupData({ ...signupData, phone: val });
          }}
        />

        <Input
          label={"Address"}
          val={signupData.address}
          onChange={(val) => {
            setSignupData({ ...signupData, address: val });
          }}
        />

        <Input
          label={"Password"}
          val={signupData.password}
          onChange={(val) => {
            setSignupData({ ...signupData, password: val });
          }}
        />

        <Input
          label={"Re-enter Password"}
          val={signupData.rePassword}
          onChange={(val) => {
            setSignupData({ ...signupData, rePassword: val });
          }}
        />

        <div className="flex justify-around mt-6">
          <Button
            label="Cancel"
            onClick={() => console.log(signupData)}
            variant={"danger"}
          />
          <Button
            label="Signup"
            onClick={() => console.log(signupData)}
            variant={"primary"}
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
