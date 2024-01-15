const shippingAddressRouter = require("express").Router();
const shippingAddressController = require("../controllers/shipping-address-controller");
const { authentification } = require("../middleware/Auth");

shippingAddressRouter.get("/", shippingAddressController.getAllShippingAddress);
shippingAddressRouter.use(authentification);
shippingAddressRouter.post(
    "/",
    shippingAddressController.createShippingAddress
);
shippingAddressRouter.get(
    "/:id",
    shippingAddressController.getShippingAddressById
);
shippingAddressRouter.put(
    "/:id",
    shippingAddressController.updateShippingAddress
);
shippingAddressRouter.delete(
    "/:id",
    shippingAddressController.deleteShippingAddress
);

module.exports = shippingAddressRouter;
