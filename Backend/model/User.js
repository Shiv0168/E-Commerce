const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username required !!!"],
      unique: [true, "unique username required !!!"],
    },
    email: {
      type: String,
      required: [true, "email required !!!"],
      unique: [true, "unique email required !!!"],
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

const virtual = userSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
exports.User = mongoose.model("User", userSchema);
