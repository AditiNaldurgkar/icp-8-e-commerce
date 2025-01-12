import React, { useEffect, useState } from "react";
import { getCurrentUser, getJwtToken } from "../utils/common";
import toast from "react-hot-toast";
import axios from "axios";
import OrderCard from "../components/OrderCard";

function UserOrders() {
  const [user, setUser] = useState({})
  const [orders, setOrders] = useState([])

  const loadUserOrders = async () => {
    if(!user?._id){
      return
    }

    try{
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/orders/user/${user._id}`,
        {
          headers: {
            Authorization: getJwtToken(),
          },
        }
      );

      setOrders(response.data.data);
    }
    catch(error){
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    const user = getCurrentUser()

    if (user) {
      setUser(user)
    }
    else{
      toast.error("Please login to access this page")
      setTimeout(() => {
        window.location.href = "/login"
      }, 2000)
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadUserOrders()
    }
  }, [user]);


  return (
    <div>
      <h1>My Orders</h1>
      <p>
        Current user: {user.name} - {user.email}
      </p>
      <div>{
      orders.map((order)=>{
        return <OrderCard key={order._id} order={order} />
      })
      }</div>
    </div>
  );
}

export default UserOrders
