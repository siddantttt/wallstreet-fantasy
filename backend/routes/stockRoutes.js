const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = process.env.STOCK_API_KEY;

router.get('/price/:symbol', async (req, res) => {
  const { symbol } = req.params;
  try {
    const response = await axios.get(`https://api.twelvedata.com/price`, {
      params: {
        symbol,
        apikey: API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching price', error: error.message });
  }
});
router.get('/search', async (req, res) => {
    const query = req.query.query;
    if (!query) return res.status(400).json({ message: "Missing query" });
  
    try {
      const response = await axios.get('https://api.twelvedata.com/symbol_search', {
        params: {
          symbol: query,
          apikey: process.env.STOCK_API_KEY
        }
      });
  
      const results = response.data.data || [];
      const formatted = results.slice(0, 10).map(stock => ({
        symbol: stock.symbol,
        name: stock.instrument_name || stock.name || "Unnamed"
      }));
      
  
      res.json(formatted);
    } catch (err) {
      res.status(500).json({ message: 'Symbol search failed', error: err.message });
    }
  });
  

module.exports = router;
