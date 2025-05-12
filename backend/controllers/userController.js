const bcrypt = require('bcrypt');
const User = require('../models/User');


// Register new user
const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: "Username already taken." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    res.status(500).json({ message: "Registration failed.", error: err.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials." });

    // No JWT for now; session simulation
    res.status(200).json({
      message: "Login successful.",
      user: {
        id: user._id,
        username: user.username,
        balance: user.balance,
        picks: user.picks
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed.", error: err.message });
  }
};

const updateUserData = async (req, res) => {
    const { username, balance, picks } = req.body;
  
    try {
      const user = await User.findOneAndUpdate(
        { username },
        { balance, picks },
        { new: true }
      );
  
      if (!user) return res.status(404).json({ message: "User not found." });
  
      res.json({
        message: "User updated successfully.",
        user: {
          username: user.username,
          balance: user.balance,
          picks: user.picks
        }
      });
    } catch (err) {
      res.status(500).json({ message: "Update failed", error: err.message });
    }
  };

  module.exports = {
    registerUser,
    loginUser,
    updateUserData
  };    
  
