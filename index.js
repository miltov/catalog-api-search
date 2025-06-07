import express from "express";
import rateLimit from "express-rate-limit";
import catalogSearchHandler from "./catalogSearch.js";

const app = express();
const PORT = process.env.PORT || 10000;

// Rate limiter: max 5 requests per minute per IP
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: {
    error: "Too many requests, please try again later."
  }
});

// Root endpoint
app.get("/", (req, res) => {
  res.send("Roblox Catalog Proxy API is running. Use /api/catalogSearch?keyword=hat");
});

// Apply rate limiter only to /api/catalogSearch route
app.get("/api/catalogSearch", limiter, catalogSearchHandler);

app.listen(PORT, () => {
  console.log(`Server is live on port ${PORT}`);
});
