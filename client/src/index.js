import { Bluetooth as BluetoothIcon, Home as HomeIcon } from "lucide-react";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <h1 className="text-red-500">E-Commerce</h1>
    <HomeIcon size="64" />

    <BluetoothIcon size={100} strokeWidth={1} />
  </>
);
