import express from 'express';
import axios from 'axios';

const app = express();
const CROSSREF_API = 'https://api.crossref.org/works';

app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  const rows = req.query.rows || 10;

  try {
    const response = await axios.get(CROSSREF_API, {
      params: { query, rows },
    });
    res.json(response.data.message.items);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
