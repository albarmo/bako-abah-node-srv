const userRouter = require("express").Router();
const UserController = require("../controllers/user-controller");
const { authorization, authentification } = require("../middleware/Auth");

userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);

userRouter.use(authentification);
userRouter.put("/:id", UserController.updateUser);
userRouter.get("/me", UserController.getCurrentUser);
userRouter.get("/:id", UserController.getUserById);

userRouter.use(authorization);
userRouter.get("/", UserController.getUserList);
userRouter.delete("/:id", UserController.deleteUser);

module.exports = userRouter;
