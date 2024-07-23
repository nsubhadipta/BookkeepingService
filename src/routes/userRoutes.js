const schemas = require("../utils/RequestValidators/user.scheme");
const middleware = require("../middlewares/validationMiddleware");

module.exports = (router) => {
  const userController = require("../controllers/userController");

  //Users API
  router.post("/users/register", middleware(schemas.register), userController.register);
  router.post("/users/login", middleware(schemas.login), userController.login);
 
};
