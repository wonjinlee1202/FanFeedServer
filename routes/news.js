const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

const NEWS_API_KEY = process.env.NEWS_API_KEY;

router.get("/:sport", async (req, res) => {
  const sport = req.params.sport;
  const sortBy = req.query.sortBy || "popularity"; // default to popularity

  try {
    const url = `https://newsapi.org/v2/everything?q=${sport}&searchIn=title&sortBy=${sortBy}&language=en&apiKey=${NEWS_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.articles) {
      return res.status(500).json({ error: "Failed to fetch news" });
    }

    res.json({ articles: data.articles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
