import fetch from "node-fetch";

export default async function catalogSearchHandler(req, res) {
  const { keyword, limit = 10 } = req.query;

  if (!keyword) {
    return res.status(400).json({ error: 'Missing keyword parameter' });
  }

  try {
    const response = await fetch(`https://catalog.roblox.com/v1/search/items?keyword=${encodeURIComponent(keyword)}&limit=${limit}`);
    
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Roblox API error' });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching Roblox catalog:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
