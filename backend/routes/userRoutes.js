const express = require('express');
const router = express.Router();

const { registerUser, loginUser, updateUserData } = require('../controllers/userController');

const axios = require('axios');
const User = require('../models/User');

const io = req.app.get('io');
io.emit('leaderboardUpdate');



router.post('/register', registerUser);
router.post('/login', loginUser);
router.patch('/update', updateUserData);

router.delete('/delete/:username', async (req, res) => {
  try {
    const { username } = req.params;
    await User.deleteOne({ username });
    res.json({ message: `🗑️ User ${username} deleted successfully.` });
  } catch (err) {
    console.error("❌ Failed to delete user:", err);
    res.status(500).json({ message: "Server error while deleting user." });
  }
});


router.get('/leaderboard', async (req, res) => {
  try {
    const users = await User.find();

    const withTotalValue = await Promise.all(users.map(async user => {
      let total = user.balance;

      for (let p of user.picks) {
        try {
          const response = await axios.get(`https://api.twelvedata.com/price?symbol=${p.stock}&apikey=${process.env.STOCK_API_KEY}`);
          const currentPrice = parseFloat(response.data.price || 0);
          total += currentPrice * p.quantity;
        } catch (e) {
          console.warn(`⚠️ Could not fetch price for ${p.stock}`);
        }
      }

      return {
        username: user.username,
        totalValue: total.toFixed(2)
      };
    }));

    const sorted = withTotalValue.sort((a, b) => b.totalValue - a.totalValue);
    res.json(sorted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Leaderboard error", error: err.message });
  }
});


module.exports = router;
