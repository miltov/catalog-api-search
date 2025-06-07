import axios from 'axios';

export default async function handler(req, res) {
  const { keyword, limit = 10 } = req.query;

  if (!keyword) {
    return res.status(400).json({ error: 'Missing keyword parameter' });
  }

  try {
    const response = await axios.get('https://catalog.roblox.com/v2/catalog/items/details', {
      params: { keyword, limit }
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching Roblox catalog:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
