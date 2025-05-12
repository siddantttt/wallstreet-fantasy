const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', socket => {
  console.log('📡 Client connected');
});

app.set('io', io); // pass io to all routes

server.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});


// === MIDDLEWARE ===
app.use(cors());
app.use(bodyParser.json());

// === ROUTES ===
app.use('/api/users', require('./routes/userRoutes'));
const stockRoutes = require('./routes/stockRoutes');
app.use('/api/stocks', stockRoutes);

// === SERVE FRONTEND ===
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// === CONNECT DB + START SERVER ===
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
  console.log("✅ MongoDB Connected");
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}).catch(err => console.error("❌ MongoDB Error:", err));
