const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
    active: { type: Boolean, required: false, default: true },
  },
  {
    timestamps: true, versionKey: false
  }
);

module.exports = mongoose.model("Library", librarySchema, "Library");
