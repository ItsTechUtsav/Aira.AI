const userModel = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { sendVerificationEmail } = require('../middlewares/email.config.js');



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

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await userModel.create({
        username,
        email,
        password: hash,
        verificationCode
    });

    await sendVerificationEmail(email, verificationCode);

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

async function verifyEmail(req, res) {
    try {
        const { email, code } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.isVarified) {
            return res.status(400).json({ message: "Account is already verified" });
        }

        // Check if the code matches
        if (user.verificationCode !== code) {
            return res.status(400).json({ message: "Invalid verification code" });
        }

        // Code matches! Clear the code and flip the verification status
        user.isVarified = true;
        user.verificationCode = undefined; // Clears it from DB
        await user.save();

        // 4. Now that they are verified, generate the JWT token and set the cookie
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie('token', token);

        res.status(200).json({
            message: "Email verified successfully!",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
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
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel
      .findById(decoded.id)
      .select("-password");

    res.json(user);
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}

async function changeUsername(req, res) {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({
        message: "Username is required",
      });
    }

    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.username = username;

    await user.save();

    res.json({
      message: "Username updated successfully",
      username: user.username,
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
}

async function verifyPassword(req, res) {
  try {
    const { oldPassword } = req.body;

    if (!oldPassword) {
      return res.status(400).json({
        message: "Password is required",
      });
    }

    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      oldPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    res.json({
      message: "Password verified",
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
}

async function changePassword(req, res) {
    try {

    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({
        message: "New password required",
      });
    }

    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.json({
      message: "Password updated successfully",
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
}

async function deleteAccount(req, res) {
   try {

    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await userModel.findByIdAndDelete(req.userId);

    res.json({
      message: "Account deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
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
    verifyEmail
}

