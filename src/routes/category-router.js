const categoryRouter = require("express").Router();
const categoryController = require("../controllers/category-controller");
const { authorization, authentification } = require("../middleware/Auth");

categoryRouter.get("/", categoryController.getCategoryList);
categoryRouter.post("/", categoryController.createCategory);
categoryRouter.get("/:id", categoryController.getCategoryById);

categoryRouter.use(authentification);
categoryRouter.use(authorization);
categoryRouter.put("/:id", categoryController.updateCategory);
categoryRouter.delete("/:id", categoryController.deleteCategory);

module.exports = categoryRouter;
