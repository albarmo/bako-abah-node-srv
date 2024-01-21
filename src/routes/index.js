const router = require("express").Router();
const userRouter = require("./user-router");
const storeRouter = require("./store-router");
const categoryRouter = require("./category-router");
const productRouter = require("./product-router");
const shippingAddressRouter = require("./shipping-address-router");
const cartRouter = require("./cart-router");
const cartItemRouter = require("./cart-item-router");
const transactionRouter = require("./transaction-router");

router.use("/user", userRouter);
router.use("/store", storeRouter);
router.use("/category", categoryRouter);
router.use("/product", productRouter);
router.use("/shipping-address", shippingAddressRouter);
router.use("/cart", cartRouter);
router.use("/cart-item", cartItemRouter);
router.use("/transaction", transactionRouter);

module.exports = router;
