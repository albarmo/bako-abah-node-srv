const router = require("express").Router();
const userRouter = require("./user-router");
const storeRouter = require("./store-router");

router.use("/user", userRouter);
router.use("/store", storeRouter);

module.exports = router;
