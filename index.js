import express from "express";
import catalogSearchHandler from "./catalogSearch.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api/catalogSearch", catalogSearchHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
