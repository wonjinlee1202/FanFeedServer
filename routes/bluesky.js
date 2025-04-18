const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

router.get("/:query", async (req, res) => {
  const query = req.params.query;
  const sortBy = req.query.sort || "top"; // default to top

  try {
    const url = `https://public.api.bsky.app/xrpc/app.bsky.feed.searchPosts?q=${query}&sort=${sortBy}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.posts) {
      return res.status(500).json({ error: "Failed to fetch posts" });
    }

    res.json({ posts: data.posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
