import fetch from "node-fetch";

export default async function catalogSearchHandler(req, res) {
  const { keyword = "", limit = 10 } = req.query;

  if (!keyword.trim()) {
    return res.status(400).json({ error: "Missing keyword parameter" });
  }

  try {
    const url = `https://catalog.roblox.com/v1/search/items?Keyword=${encodeURIComponent(keyword)}&Limit=${limit}&SortType=3`;

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({ error: "Roblox API error" });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching Roblox catalog:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
