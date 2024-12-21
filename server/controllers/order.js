import Order from "../models/Order.js";

const postOrders = async (req, res) => {
  const { products, deliveryAddress, phone, paymentMode } = req.body;

  if (!products || !deliveryAddress || !phone || !paymentMode) {
    return res.status(400).json({
      success: false,
      message: `products, totalBill, deliveryAddress, phone, paymentMode are required`,
    });
  }

  let totalBill = 0;

  products.forEach((product) => {
    totalBill += product.price * product.quantity;
  });

  try {
    const newOrder = new Order({
      userId: req.user._id,
      products,
      totalBill,
      deliveryAddress,
      phone,
      paymentMode,
    });

    const savedOrder = await newOrder.save();

    return res.json({
      success: true,
      message: "Order placed successfully",
      data: savedOrder,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const putOrders = async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  let order;

  try {
    order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  // user can only update his own order
  if(user.role=="user" && order.userId!=user._id){
    return res.status(401).json({
      success: false,
      message: "You are not authorized to update this order",
    });
  }

  // user can only cancel the order if it is not delivered
  if(user.role=="user"){
    if(order.status == "delivered"){
      return res.status(400).json({
        success: false,
        message: "Order has already been delivered",
      });
    }

    if (req.body.status == "cancelled") {
      order.status = "cancelled";
    }
  }

  if (req.body.phone) {
    order.phone = req.body.phone;
  }

  if (req.body.deliveryAddress) {
    order.deliveryAddress = req.body.deliveryAddress;
  }

  if(user.role=="admin"){
    order.status = req.body.status;
    order.timeline = req.body.timeline;
  }

  await order.save();

  const updatedOrder = await Order.findById(id);

  return res.json({
    success: true,
    message: "Order updated successfully",
    data: updatedOrder,
  });
};

export { postOrders, putOrders };
