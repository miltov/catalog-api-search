import axios from "axios";

export default async function catalogSearchHandler(req, res) {
  const { keyword, limit = 10 } = req.query;

  if (!keyword) {
    return res.status(400).json({ error: "Missing keyword parameter" });
  }

  try {
    const response = await axios.post("https://catalog.roblox.com/v1/search/items", {
      Keyword: keyword,
      Limit: Number(limit),
      SortType: 3,
      Category: 1, // 1 = All categories
    }, {
      headers: {
        "Content-Type": "application/json",
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Roblox API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Roblox API error" });
  }
}
