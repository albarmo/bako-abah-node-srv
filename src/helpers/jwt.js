const jwt = require("jsonwebtoken");

const generateAccessToken = (payload) => {
    return jwt.sign(payload, "Mb4HDu90ngM4nt4b!", { expiresIn: "7d" });
};

const verifyToken = (accessToken) => {
    return jwt.verify(accessToken, "Mb4HDu90ngM4nt4b!");
};

module.exports = {
    generateAccessToken,
    verifyToken,
};
