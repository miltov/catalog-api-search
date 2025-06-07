export default async function catalogSearchHandler(req, res) {
  const { keyword, limit = 10 } = req.query;

  if (!keyword) {
    return res.status(400).json({ error: 'Missing keyword parameter' });
  }

  try {
    const robloxResponse = await fetch(`https://catalog.roblox.com/v2/catalog/items/details?keyword=${encodeURIComponent(keyword)}&limit=${limit}`);

    if (!robloxResponse.ok) {
      return res.status(robloxResponse.status).json({ error: 'Roblox API error' });
    }

    const data = await robloxResponse.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching Roblox catalog:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
