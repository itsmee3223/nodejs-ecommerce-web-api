const { Schema, model } = require("mongoose");

const CategorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide catedory name"],
  },
  icon: { type: String },
  color: { type: String },
});

CategorySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

CategorySchema.set("toJSON", { virtuals: true });

module.exports = model("Category", CategorySchema);
