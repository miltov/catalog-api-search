export default async function catalogSearchHandler(req, res) {
  const { keyword, limit = 10 } = req.query;

  if (!keyword) {
    return res.status(400).json({ error: "Missing keyword parameter" });
  }

  try {
    const searchResponse = await fetch(
      `https://catalog.roblox.com/v1/search/items?keyword=${encodeURIComponent(keyword)}&limit=${limit}`
    );

    if (!searchResponse.ok) {
      return res.status(searchResponse.status).json({ error: "Roblox API search error" });
    }

    const searchData = await searchResponse.json();
    const itemIds = searchData.data.map(item => item.id);

    if (itemIds.length === 0) {
      return res.status(200).json({ message: "No items found", data: [] });
    }

    const detailsResponse = await fetch(
      `https://catalog.roblox.com/v1/catalog/items/details?itemIds=${itemIds.join(",")}`
    );

    if (!detailsResponse.ok) {
      return res.status(detailsResponse.status).json({ error: "Roblox API details error" });
    }

    const detailsData = await detailsResponse.json();

    return res.status(200).json(detailsData.data);
  } catch (error) {
    console.error("Error fetching Roblox catalog:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
