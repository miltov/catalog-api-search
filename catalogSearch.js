import axios from "axios";
import { cache } from "./index.js";

const catalogSearchHandler = async (req, res) => {
  try {
    const keyword = req.query.keyword?.toLowerCase();
    if (!keyword) {
      return res.status(400).json({ error: "Missing required query param: keyword" });
    }

    // Check cache
    const cached = cache.get(keyword);
    if (cached) {
      return res.json({ source: "cache", keyword, data: cached });
    }

    const url = `https://catalog.roblox.com/v1/search/items/details`;

    const params = {
      Category: "All",
      Keyword: keyword,
      Limit: 10,
      IncludeNotForSale: false,
      SortType: "Relevance",
      SortAggregation: "Popular",
    };

    const headers = {
      "User-Agent": "Mozilla/5.0 (compatible; CatalogSearchBot/1.0)",
      "Accept": "application/json",
    };

    const response = await axios.get(url, { params, headers });

    if (response.data?.data) {
      cache.set(keyword, response.data.data); // Save to cache
      return res.json({
        source: "api",
        keyword,
        resultsCount: response.data.data.length,
        data: response.data.data,
      });
    } else {
      return res.status(502).json({ error: "Invalid response from Roblox API", raw: response.data });
    }
  } catch (err) {
    const message = err.response?.data || err.message || "Unknown error";
    return res.status(500).json({ error: "Roblox API error", details: message });
  }
};

export default catalogSearchHandler;
