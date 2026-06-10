const userModel = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { sendVerificationEmail } = require('../middlewares/email.config.js');

async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;

        const isUserExist = await userModel.findOne({ 
            $or: [{ username: username }, { email: email }]
        });

        if (isUserExist) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hash = await bcrypt.hash(password, 10);

        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = await userModel.create({
            username,
            email,
            password: hash,
            isVerified: false, // Account locked until email code is submitted
            verificationToken  // Saved securely to compare against frontend input
        });

        try {
            await sendVerificationEmail(user.email, verificationToken);
        } catch (emailError) {
            console.error("Nodemailer routing error on signup:", emailError);
            // We still have the user in DB, flow can continue or fail gracefully
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.cookie('token', token);

        res.status(201).json({ 
            message: "User registered successfully. Verification email sent.",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                isVerified: user.isVerified
            }
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error during registration" });
    }
}

async function verifyOtp(req, res) {
    try {
        const { otp } = req.body;
        
        if (!otp) {
            return res.status(400).json({ message: "Verification code is required" });
        }

        const user = await userModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.verificationToken !== otp) {
            return res.status(400).json({ message: "Invalid or expired verification code" });
        }

        // Mark account as verified and clear temporary token memory
        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        res.status(200).json({
            message: "Account verified successfully",
            isVerified: true
        });
    } catch (error) {
        console.error("OTP verification failure:", error);
        res.status(500).json({ message: "Server error during verification code check" });
    }
}

async function loginUser(req, res) {
    try {
        const { username, email, password } = req.body;

        const user = await userModel.findOne({ 
            $or: [
                { username }, 
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
     
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.cookie('token', token);

        res.status(200).json({ 
            message: "User logged in successfully",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                isVerified: user.isVerified
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error during login" });
    }
}

async function getMe(req, res) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password");

    res.json(user);
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}

async function changeUsername(req, res) {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = username;
    await user.save();

    res.json({
      message: "Username updated successfully",
      username: user.username,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

async function verifyPassword(req, res) {
  try {
    const { oldPassword } = req.body;

    if (!oldPassword) {
      return res.status(400).json({ message: "Password is required" });
    }

    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    res.json({ message: "Password verified" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

async function changePassword(req, res) {
    try {
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({ message: "New password required" });
    }

    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

async function deleteAccount(req, res) {
   try {
    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await userModel.findByIdAndDelete(req.userId);

    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    changeUsername,
    changePassword,
    deleteAccount,
    verifyPassword,
    verifyOtp 
};