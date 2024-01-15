const cartItemRouter = require("express").Router();
const cartItemController = require("../controllers/cart-item-controller");
const { authorization, authentification } = require("../middleware/Auth");

cartItemRouter.use(authentification);
cartItemRouter.post("/", cartItemController.createCart);
cartItemRouter.get("/:id", cartItemController.getCartById);
cartItemRouter.put("/:id", cartItemController.updateCart);
cartItemRouter.delete("/:id", cartItemController.deleteCart);

cartItemRouter.use(authorization);
cartItemRouter.get("/", cartItemController.getAllCart);

module.exports = cartItemRouter;
