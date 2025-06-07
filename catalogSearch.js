import axios from "axios";

export default async function catalogSearchHandler(req, res) {
  const { keyword, limit = 10 } = req.query;

  if (!keyword) return res.status(400).json({ error: "Missing keyword" });

  try {
    const url = `https://catalog.roblox.com/v1/search/items/details?Keyword=${encodeURIComponent(keyword)}&Limit=${limit}`;
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
