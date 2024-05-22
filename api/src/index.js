import express from "express";
import axios from "axios";
import unzipper from "unzipper";
import csv from "csvtojson";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

app.use(
  cors({
    origin: "https://statisticx-client.vercel.app",
    credentials: true,
    methods: ["GET", "OPTIONS"],
  })
);

const username = process.env.api_username;
const key = process.env.api_key;

app.get("/api/data", async (req, res) => {
  const dataset = "chopper53/machine-learning-engineer-salary-in-2024";
  const kaggleApiUrl = `https://www.kaggle.com/api/v1/datasets/download/${dataset}`;

  try {
    const response = await axios.get(kaggleApiUrl, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
      responseType: "stream",
    });

    const jsonArray = [];

    // Pipe the response stream through unzipper to extract the CSV file
    response.data
      .pipe(unzipper.ParseOne())
      .pipe(csv()) // Convert CSV data to JSON
      .on("data", (data) => {
        const json = JSON.parse(data.toString());
        jsonArray.push(json); // Accumulate JSON objects in the array
      })
      .on("end", () => {
        res.json(jsonArray); // Send the array of JSON objects as the response
      })
      .on("error", (err) => {
        console.error(err);
        res.status(500).send("Error processing CSV data"); // Handle errors
      });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error in fetching data from Kaggle");
  }
});

app.listen(5000, () => {
  console.log("LISTENING AT PORT 5000");
});
