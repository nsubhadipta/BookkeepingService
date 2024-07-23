var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

var userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "Borrower",
      enum: ["Author", "Borrower"],
      required: true,
    },
    phone: { type: String, required: false },
    address: { type: String, required: false },
    description: { type: String, default: "" },
    profilePic: { type: String, default: "nopic.jpg" },
    deleted: { type: Boolean, default: false },
    active: { type: String, default: true },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1, deleted: 1 }, { unique: true });
userSchema.index({ name: 1 });

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 1);
  console.log(expirationDate);

  return jwt.sign(
    {
      id: this._id,

      exp: parseInt(expirationDate.getTime() / 1000, 10),
    },
    "(m2H:)1=G:4`?|w"
  );
};
userSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    token: this.generateJWT(),
  };
};
// checking if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model("User", userSchema, 'User');
