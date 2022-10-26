const { Schema, model } = require("mongoose");

const OrderItemSchema = new Schema({
  quantity: {
    type: Number,
    required: [true, "Please provide quantity number"],
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

module.exports = model("OrderItem", OrderItemSchema);
