const transactionRouter = require("express").Router();
const transactionController = require("../controllers/transaction-controller");
const { authorization, authentification } = require("../middleware/Auth");

transactionRouter.use(authentification);
transactionRouter.post("/", transactionController.createTransaction);
transactionRouter.get("/:id", transactionController.getTransactionDetail);
transactionRouter.get(
    "/history/:user_id",
    transactionController.getUserTransactionHistory
);
transactionRouter.patch("/:id", transactionController.uploadProofOfPayment);

transactionRouter.use(authorization);
transactionRouter.get("/", transactionController.getAllTransaction);
transactionRouter.put("/:id", transactionController.updateTransaction);
transactionRouter.delete("/:id", transactionController.deleteTransaction);

module.exports = transactionRouter;
