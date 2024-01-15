const productRouter = require("express").Router();
const productController = require("../controllers/product-controller");
const { authorization, authentification } = require("../middleware/Auth");

productRouter.get("/", productController.getProductList);
productRouter.get("/:id", productController.getProductById);

productRouter.use(authentification);
productRouter.use(authorization);
productRouter.post("/", productController.createProduct);
productRouter.put("/:id", productController.updateProduct);
productRouter.delete("/:id", productController.deleteProduct);

module.exports = productRouter;
