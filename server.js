import express from 'express';
import cors from 'cors';
import YTMusic from 'ytmusic-api';

const app = express();
const ytmusic = new YTMusic();

app.use(cors()); // Allow CORS for frontend requests

// Initialize YouTube Music API
(async () => {
  await ytmusic.initialize();
})();

// API Route to Fetch Songs
app.get('/api/search', async (req, res) => {
  try {
    const query = req.query.q; // Get search term from frontend
    const results = await ytmusic.search(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch songs' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
