const jwt = require("jsonwebtoken");
const _ = require("lodash");
const User = require("../models/userModel");
require("dotenv").config();  
// process.env.JWT_SECRET


exports.grantAccess = function (modName, permName) {
  return async (req, res, next) => {
    try {
      const token = req.header("authorization");
      if (!token)
        return res
          .status(401)
          .send({ status: 401, message: "Access Denied: No Token Provided!" });
      try {
        const decoded = jwt.verify(token, "(m2H:)1=G:4`?|w");
        if (decoded) {
          const userData = await User.findOne({ _id: decoded.id });

          if (userData) {
            req.authID = decoded.id;
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

module.exports = exports;
