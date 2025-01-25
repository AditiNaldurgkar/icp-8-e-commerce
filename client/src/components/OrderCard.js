import React from "react";

import { getReadableTimestamp } from "../utils/common";

function OrderCard({ order, onClick }) {
  const { _id, status, products, createdAt, totalBill, deliveryAddress } =
    order;
  return (
    <div className="border p-4 m-4 bg-white relative rounded-md" onClick={onClick}>
      <p>
        Order ID: {_id}, Ordered On: {getReadableTimestamp(createdAt)}
      </p>
      <p className="text-lg font-bold mt-3">
        {products.map((product) => product.productId.name).join(", ")}
      </p>
      <p>Total Amount: ₹{totalBill}</p>
      <p>Address: {deliveryAddress} </p>

      <span className="bg-blue-500 rounded-full px-3 py-1 text-white absolute top-2 right-2">
        {status}
      </span>
    </div>
  );
}

export default OrderCard;
