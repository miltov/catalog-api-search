import express from "express";
import rateLimit from "express-rate-limit";
import NodeCache from "node-cache";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 10000;

// Simple in-memory cache, cache items for 60 seconds
const cache = new NodeCache({ stdTTL: 60 });

// Rate limiter middleware: max 10 requests per minute per IP
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: {
    error: "Too many requests, please try again later.",
  },
});

app.use(limiter);

app.get("/", (req, res) => {
  res.send("Roblox Catalog Proxy API is running. Use /api/catalogSearch?keyword=hat");
});

app.get("/api/catalogSearch", async (req, res) => {
  const keyword = req.query.keyword;
  if (!keyword) {
    return res.status(400).json({ error: "Missing 'keyword' query parameter" });
  }

  // Check cache first
  const cached = cache.get(keyword);
  if (cached) {
    return res.json({ source: "cache", data: cached });
  }

  try {
    // Call Roblox catalog API (make sure the URL is correct)
    const response = await axios.get(
      `https://catalog.roblox.com/v1/search/items/details`,
      {
        params: {
          Category: "1", // Optional: filter category if you want
          Keyword: keyword,
          Limit: 10,
        },
        headers: {
          "User-Agent": "RobloxCatalogProxy/1.0",
        },
      }
    );

    // Cache the data before responding
    cache.set(keyword, response.data);

    res.json({ source: "api", data: response.data });
  } catch (err) {
    if (err.response?.status === 429) {
      return res.status(429).json({ error: "Roblox API rate limit exceeded. Try again later." });
    }
    console.error(err);
    res.status(500).json({ error: "Roblox API error", details: err.message || err.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`Server is live on port ${PORT}`);
});
