const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  summary: { type: String, default: "" },
  library: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Library",
    required: true,
  },
  borrower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  borrowLogs: [
    {
      borrowed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      charge: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  coverImage: {
    type: String,
    required: false,
  },
  active: { type: Boolean, required: false, default: true },
},
{
  timestamps: true, versionKey: false
}
);

module.exports = mongoose.model('Book', bookSchema, 'Book');
