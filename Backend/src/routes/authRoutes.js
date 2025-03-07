const express= require("express");
const bcrypt =require("bcryptjs");
const jwt= require("jsonwebtoken");
const User = require("../models/user");
const authenticateUser = require("../middlewares/authMiddleware");

require("dotenv").config();

const router=express.Router();

//REGISTER USER HERE (SIGN-UP);

router.post("/register", async (req, res) => {
    try {
        console.log("Register API called"); 

        const { name, email, password, role, institution } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({ name, email, password: hashedPassword, role, institution });
        await user.save();

        console.log("User Registered:", user); // Debugging Log

        res.status(201).json({ message: "User Registered Successfully!" });
    } catch (error) {
        console.error("Error Registering User:", error); //  Log errors
        res.status(500).json({ error: error.message });
    }
});


//LOGIN USER
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        //  Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found!" });
        }

        //  Check if user.password is defined
        if (!user.password) {
            return res.status(500).json({ message: "Password is missing from the database!" });
        }

        //  Fix: Compare password correctly
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials!" });
        }

        //  Generate JWT Token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//Protected Route: Get profiles(Using Middlewares)
router.get("/profiles",authenticateUser, async(req,res)=>{
    try{
        const user = await User.findById(verified.id).select("-pasword");
        res.json(user);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
});
router.get("/test", (req, res) => {
    res.send("Auth route is working!");
});

module.exports =router;