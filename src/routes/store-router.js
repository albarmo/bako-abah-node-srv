const storeRouter = require("express").Router();
const StoreController = require("../controllers/store-controller");
const { authorization, authentification } = require("../middleware/Auth");

storeRouter.get("/", StoreController.getStoreList);
storeRouter.get("/:id", StoreController.getStoreById);
storeRouter.post("/", StoreController.createStore);

storeRouter.use(authentification);
storeRouter.use(authorization);
storeRouter.put("/:id", StoreController.updateStore);
storeRouter.delete("/:id", StoreController.deleteStore);

module.exports = storeRouter;
