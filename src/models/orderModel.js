const { Schema, model } = require("mongoose");

const OrderSchema = new Schema({
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItem",
      required: [true, "Please provide order item"],
    },
  ],
  shippingAddress1: {
    type: String,
    required: [true, "Please provide shipping addres at least 1"],
  },
  shippingAddress2: {
    type: String,
  },
  city: {
    type: String,
    required: [true, "Please provide city"],
  },
  zip: {
    type: String,
    required: [true, "Please provide zip code"],
  },
  country: {
    type: String,
    required: [true, "Please provide country"],
  },
  phone: {
    type: String,
    required: [true, "Please provide phone number"],
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  totalPrice: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
});

OrderSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

OrderSchema.set("toJSON", { virtuals: true });

module.exports = model("Order", OrderSchema);

/**
Order Example:

{
    "orderItems" : [
        {
            "quantity": 3,
            "product" : "5fcfc406ae79b0a6a90d2585"
        },
        {
            "quantity": 2,
            "product" : "5fd293c7d3abe7295b1403c4"
        }
    ],
    "shippingAddress1" : "Flowers Street , 45",
    "shippingAddress2" : "1-B",
    "city": "Prague",
    "zip": "00000",
    "country": "Czech Republic",
    "phone": "+420702241333",
    "user": "5fd51bc7e39ba856244a3b44"
}

 */
