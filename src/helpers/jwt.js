const jwt = require("jsonwebtoken");

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const verifyToken = (accessToken) => {
    return jwt.verify(accessToken, "146155");
};

module.exports = {
    generateAccessToken,
    verifyToken,
};
