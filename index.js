import express from "express";
import rateLimit from "express-rate-limit";
import NodeCache from "node-cache";
import catalogSearchHandler from "./catalogSearch.js";

const app = express();
const PORT = process.env.PORT || 10000;

// Export cache so it's shared with the handler
export const cache = new NodeCache({ stdTTL: 60 }); // cache each keyword for 60 seconds

// Rate limiter: 10 requests per minute per IP
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: "Too many requests, please try again later." },
});

app.use(limiter);

app.get("/", (req, res) => {
  res.send("Roblox Catalog Proxy API is running. Use /api/catalogSearch?keyword=hat");
});

// ✅ Use the unified search handler
app.get("/api/catalogSearch", catalogSearchHandler);

app.listen(PORT, () => {
  console.log(`Server is live on port ${PORT}`);
});
