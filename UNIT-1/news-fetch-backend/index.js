import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());

app.get("/news", async (req, res) => {
  try {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const formattedToday = today.toISOString().split('T')[0];
    const formattedYesterday = yesterday.toISOString().split('T')[0];

    const url = `https://newsapi.org/v2/everything?q=tesla&from=${formattedYesterday}&to=${formattedToday}&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching news" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
