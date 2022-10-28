const asyncHandler = require("../middlewares/asyncHandler");

const OrderModel = require("../models/orderModel");
const OrderItemModel = require("../models/orderItemModel");

exports.getOrders = asyncHandler(async (req, res) => {
  const orderList = await Order.find()
    .populate("user", "name")
    .sort({ dateOrdered: -1 });

  if (!orderList) {
    return res.status(404).json({
      status: "fail",
      message: "no order found",
    });
  }
  return res.status(200).json({
    status: "success",
    data: orderList,
  });
});

exports.getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name")
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        populate: "category",
      },
    });

  if (!order) {
    return res.status(404).json({
      status: "fail",
      message: "no order found",
    });
  }

  return res.status(200).json({
    status: "success",
    data: order,
  });
});

exports.createOrder = asyncHandler(async (req, res) => {
  const orderItemsIds = Promise.all(
    req.body.orderItems.map(async (orderitem) => {
      let newOrderItem = new OrderItemModel({
        quantity: orderitem.quantity,
        product: orderitem.product,
      });

      newOrderItem = await newOrderItem.save();

      return newOrderItem._id;
    })
  );

  const orderItemsIdsResolved = await orderItemsIds;

  const totalPrices = await Promise.all(
    orderItemsIdsResolved.map(async (orderItemId) => {
      const orderItem = await OrderItemModel.findById(orderItemId).populate(
        "product",
        "price"
      );

      const totalPrice = orderItem.product.price * orderItem.quantity;

      return totalPrice;
    })
  );

  const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

  let order = new OrderModel({
    orderItems: orderItemsIdsResolved,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: totalPrice,
    user: req.body.user,
  });
  order = await order.save();

  if (!order) {
    return res.status(400).json({
      status: "fail",
      message: "the order cannot be created!",
    });
  }

  res.status(200).json({
    status: "success",
    data: order,
  });
});

exports.updateOrder = asyncHandler(async (req, res) => {
  const order = await OrderModel.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    { new: true }
  );

  if (!order) {
    return res.status(400).json({
      status: "fail",
      message: "the order cannot be update!",
    });
  }

  res.status(200).json({
    status: "success",
    data: order,
  });
});

exports.deleteOrder = asyncHandler(async (req, res) => {
  const deleteOrder = await OrderModel.findOneAndDelete(req.params.id);
  if (!order) {
    return res
      .status(404)
      .json({ status: "fail", message: "order not found!" });
  }
  deleteOrder.orderItems.map(async (orderItem) => {
    await OrderItemModel.findOneAndDelete(orderItem);
  });

  return res
    .status(200)
    .json({ status: "success", message: "success deleted" });
});
