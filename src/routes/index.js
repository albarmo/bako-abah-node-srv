const router = require("express").Router();
const userRouter = require("./user-router");
const storeRouter = require("./store-router");
const categoryRouter = require("./category-router");
const productRouter = require("./product-router");

router.use("/user", userRouter);
router.use("/store", storeRouter);
router.use("/category", categoryRouter);
router.use("/product", productRouter);

module.exports = router;
