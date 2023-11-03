const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "product required !!!"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user required !!!"],
    },
    quantity: { type: Number, required: [true, "quantity required !!!"] },
  },
  {
    timestamps: true,
  }
);

const virtual = cartSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

cartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
exports.Cart = mongoose.model("Cart", cartSchema);
