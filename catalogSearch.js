import axios from "axios";

const catalogSearchHandler = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    if (!keyword) {
      return res.status(400).json({ error: "Missing required query param: keyword" });
    }

    // Roblox catalog search API URL
    const url = `https://catalog.roblox.com/v1/search/items/details`;

    // Query params for search
    const params = {
      Category: "All",
      Keyword: keyword,
      Limit: 10,
      IncludeNotForSale: false,
      SortType: "Relevance",
      SortAggregation: "Popular"
    };

    // Roblox requires user-agent header; add one to avoid 403 errors
    const headers = {
      "User-Agent": "Mozilla/5.0 (compatible; CatalogSearchBot/1.0)",
      "Accept": "application/json"
    };

    // Make GET request to Roblox catalog search API
    const response = await axios.get(url, { params, headers });

    // If Roblox returns data properly, forward relevant parts
    if (response.data && response.data.data) {
      return res.json({
        keyword,
        resultsCount: response.data.data.length,
        data: response.data.data
      });
    } else {
      return res.status(502).json({ error: "Invalid response from Roblox API", raw: response.data });
    }
  } catch (err) {
    // Return full error info for debugging
    let message = err.message || "Unknown error";
    if (err.response && err.response.data) {
      message = err.response.data;
    }
    return res.status(500).json({ error: "Roblox API error", details: message });
  }
};

export default catalogSearchHandler;
