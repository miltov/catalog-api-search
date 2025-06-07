import express from "express";
import catalogSearchHandler from "./catalogSearch.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api/catalogSearch", catalogSearchHandler);

// Optional: Root message
app.get("/", (_, res) => {
  res.send("Roblox Catalog Proxy API is running. Use /api/catalogSearch?keyword=hat");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
