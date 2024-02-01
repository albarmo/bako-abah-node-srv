const cartItemRouter = require("express").Router();
const cartItemController = require("../controllers/cart-item-controller");
const { authorization, authentification } = require("../middleware/Auth");

cartItemRouter.use(authentification);
cartItemRouter.post("/", cartItemController.createOrUpdateCartItem);
cartItemRouter.get("/:id", cartItemController.getCartItemById);
cartItemRouter.put("/:id", cartItemController.updateCartItem);
cartItemRouter.delete("/:id", cartItemController.deleteCartItem);

cartItemRouter.use(authorization);
cartItemRouter.get("/", cartItemController.getAllCartItem);

module.exports = cartItemRouter;
