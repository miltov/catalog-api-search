import express from "express";
import catalogSearchHandler from "./catalogSearch.js";

const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send('Roblox Catalog Proxy API is running. Use /api/catalogSearch?keyword=hat');
});

app.get("/api/catalogSearch", catalogSearchHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
