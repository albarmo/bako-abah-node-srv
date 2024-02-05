const jwt = require("jsonwebtoken");

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const verifyToken = (accessToken) => {
    return jwt.verify(accessToken, process.env.JWT_SECRET);
};

module.exports = {
    generateAccessToken,
    verifyToken,
};
