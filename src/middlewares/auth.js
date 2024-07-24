const jwt = require("jsonwebtoken");
const _ = require("lodash");
const User = require("../models/userModel");
const Book = require("../models/bookModel");
require("dotenv").config();  


exports.grantAccess = function (modName, permName) {
  return async (req, res, next) => {
    try {
      const token = req.header("authorization");
      if (!token)
        return res
          .status(401)
          .send({ status: 401, message: "Access Denied: No Token Provided!" });
      try {
        console.log(process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) {
          const userData = await User.findOne({ _id: decoded.id });

          if (userData) {
            req.user = {
              id: decoded.id,
              role: decoded.role,
            };
            next();
          } else {
            res.status(401).send({
              status: 401,
              data: {
                message: "Unable to process your request",
                details: "",
              },
              error: "",
            });
          }
        } else {
          res.status(401).send({
            status: 401,
            data: { message: "Unable to process your request", details: "" },
            error: "",
          });
        }
      } catch (ex) {
        res.status(401).send({
          status: 401,
          data: { message: "Invalid Token", details: "" },
          error: "",
        });
      }
    } catch (error) {
      next(error);
    }
  };
};

exports.authorizeLibraryActions = async (req, res, next) => {
  try {
    const bookId = req.body.bookId || req.params.bookId;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    // Check if the authenticated user is the author of the book
    if (book.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied. You are not the author of this book.' });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'User not authorized' });
    }
    next();
  };
};


module.exports = exports;
