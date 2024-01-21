require("dotenv").config();

const express = require("express");
const App = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const logger = require("morgan");
const routes = require("./src/routes");
const errorHandler = require("./src/middleware/errorHandler");

App.use(logger("dev"));
App.use(cors());

App.use(express.urlencoded({ extended: "false" }));
App.use(express.json());

App.use(routes);
App.use(errorHandler);

App.get("/", (req, res) => {
    return res
        .status(200)
        .json({ status_message: `BAKO_ABAH_SRV is running on port ${PORT}` });
});

// Define the static file path
App.use(express.static(__dirname + "/public/uploads"));
App.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

App.listen(PORT, () => {
    console.log(`This Server running on port ${PORT}`);
});

module.exports = App;
