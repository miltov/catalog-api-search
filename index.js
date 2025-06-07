import express from "express";
import catalogSearchHandler from "./catalogSearch.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api/catalogSearch", catalogSearchHandler);

const port = process.env.PORT || 3000;  // 3000 fallback for local dev
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
