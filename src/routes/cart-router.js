const cartRouter = require("express").Router();
const cartController = require("../controllers/cart-controller");
const { authorization, authentification } = require("../middleware/Auth");

cartRouter.use(authentification);
cartRouter.post("/", cartController.createCart);
cartRouter.get("/user", cartController.getAllCart);
cartRouter.get("/:id", cartController.getCartById);
cartRouter.put("/:id", cartController.updateCart);
cartRouter.delete("/:id", cartController.deleteCart);

cartRouter.get("/", cartController.getAllCart);
cartRouter.use(authorization);

module.exports = cartRouter;
