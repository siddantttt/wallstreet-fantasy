# 💸 Wallstreet Fantasy League

A full-stack stock trading simulation web app that lets users buy and sell stocks with virtual cash and compete on a dynamic leaderboard — inspired by Fantasy Premier League, but for finance.

---

## 🚀 Features

- 📝 **Register / Login**
- 📊 **Create a portfolio** by buying up to 5 different stocks per week
- 💰 **View balance & total portfolio value**
- 📈 **Get real-time stock prices** via [Twelve Data API](https://twelvedata.com)
- 🔄 **Sell stocks** at market value
- 🏆 **Leaderboard** ranking users by total portfolio value
- 🧼 **No WebSocket / WebRTC** bloat — clean and focused codebase
- 🔒 **MongoDB** for persistent user data (balance, picks)
- 📦 Fully responsive SPA with a sleek UI

---

## 🧠 Tech Stack

- **Frontend:** HTML, CSS, JavaScript (vanilla)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **API:** [Twelve Data](https://twelvedata.com) for real-time stock prices
- **Other:** Service Worker for offline caching

---

## 🛠️ Setup Instructions

1. **Clone the repo**  
   ```bash
   git clone https://github.com/yourusername/wallstreet-fantasy.git
   cd wallstreet-fantasy
