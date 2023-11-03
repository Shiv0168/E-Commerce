const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name required !!!"],
      unique: [true, "unique name required !!!"],
    },
    email: {
      type: String,
      required: [true, "email required !!!"],
    },
    password: {
      type: String,
      required: [true, "password required !!!"],
    },
  },
  {
    timestamps: true,
  }
);

const virtual = productSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Product = mongoose.model("Product", productSchema);
