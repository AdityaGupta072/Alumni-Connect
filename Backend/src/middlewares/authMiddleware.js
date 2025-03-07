const jwt = require("jsonwebtoken");

// Middleware to verify JWT Token
const authenticateUser = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; 
        if (!token) return res.status(401).json({ message: "Unauthorized: No Token Provided" });

        // Verify Token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next(); // Proceed to next middleware or route
    } catch (error) {
        res.status(401).json({ message: "Unauthorized: Invalid Token" });
    }
};

module.exports = authenticateUser;
