const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      requried: true,
      unique: true,
    },
    password: {
      type: String,
      requried: true,
    },
  },
  { timestamps: true }
);

const User = new model("User", UserSchema);

module.exports = User;
