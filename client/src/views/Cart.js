import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const loadCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  };

  const removeItemFromCart = (productId) => {
    const indexOfProduct = cart.findIndex(
      (product) => product.productId === productId
    );

    if (indexOfProduct > -1) {
      cart.splice(indexOfProduct, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
    }

    toast.success("Product removed from cart");
  };

  useEffect(() => {
    let totalVal = 0;

    cart.forEach((product) => {
      totalVal += product.price * product.quantity;
    });

    setTotal(totalVal);
  }, [cart]);

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <div>
      <h1 className="text-4xl text-center py-10">My Cart</h1>

      <div className="flex flex-col flex-wrap justify-center items-center">
        {cart.map((product) => {
          const { image, name, price, productId, quantity } = product;
          const totalVal = price * quantity;

          return (
            <div
              className="bg-white shadow-lg rounded-lg overflow-hidden m-5 px-10 py-5 w-full md:w-2/3 relative flex"
              key={productId}
            >
              <img
                src={image}
                alt={name}
                className="h-40 object-contain object-center"
              />
              <div>
                <h1 className="text-2xl font-bold">{name}</h1>
                <p className="text-lg">₹ {price}/-</p>
                <p className="text-lg">Quantity: {quantity}</p>
                <p className="text-lg">Total: ₹ {totalVal}/-</p>
              </div>

              <button
                className="absolute top-5 right-5 bg-red-500 text-sm px-5 py-1 text-white rounded-lg"
                onClick={() => removeItemFromCart(productId)}
              >
                Remove From Cart
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center items-center">
        <span className="text-2xl mr-10">Total: ₹ {total}/-</span>

        <button className="bg-blue-500 text-white px-5 py-2 rounded-lg">
          Checkout
        </button>
      </div>

      <Toaster />
    </div>
  );
}

export default Cart;
