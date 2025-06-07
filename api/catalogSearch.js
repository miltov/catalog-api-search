import axios from "axios";

export default async function handler(req, res) {
  try {
    // Get the 'keyword' query parameter from URL (?keyword=hat)
    const { keyword = "" } = req.query;

    // Construct Roblox Catalog API URL
    const url = `https://catalog.roblox.com/v2/search/items/details?Limit=20&Keyword=${encodeURIComponent(keyword)}`;

    // Fetch data from Roblox Catalog API
    const response = await axios.get(url);

    // Return the JSON data to the client
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching catalog data:", error.message);

    // Return error message with status 500
    res.status(500).json({ error: "Failed to fetch catalog data" });
  }
}