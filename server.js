require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user");
const newsRoutes = require("./routes/news");
const blueskyRoutes = require('./routes/bluesky');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/news", newsRoutes);
app.use('/api/bluesky', blueskyRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true, // optional, but may help
})
  .then(() => {
    app.listen(PORT, () => console.log("Server running on port 5000"));
  });
