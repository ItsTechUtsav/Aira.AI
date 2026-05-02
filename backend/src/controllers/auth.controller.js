const userModel = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



async function registerUser(req, res) {

    const { username, email, password } = req.body;

    const isUserExist = await userModel.findOne({ 
        $or: [{ username: username }, 
            { email: email }]
    });

    if (isUserExist) {
        return res.status(409).json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash
    });

    const token = jwt.sign({
         id: user._id 
        }, process.env.JWT_SECRET);

    res.cookie('token', token)

    res.status(201).json({ 
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });

}

async function loginUser(req, res) {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({ 
        $or: [
            { username}, 
            { email }
        ]
    });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
    }
 
    const token = jwt.sign({
         id: user._id 
        }, process.env.JWT_SECRET);

    res.cookie('token', token)

    res.status(200).json({ 
        message: "User logged in successfully",
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });

}

async function getMe(req, res) {
    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel
            .findById(decoded.id)
            .select("-password");

        res.json(user);

    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}

