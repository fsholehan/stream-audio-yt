const express = require("express");
const ytdl = require("@distube/ytdl-core");
const cors = require("cors");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(cors());

app.get("/audio", (req, res) => {
  const videoUrl = req.query.url;

  if (!videoUrl) {
    return res.status(400).send("Video URL is required");
  }

  console.log(`Request for video URL: ${videoUrl}`);

  res.header("Content-Type", "audio/mpeg");
  ytdl(videoUrl, { filter: "audioonly", quality: "lowestaudio" })
    .on("error", (err) => {
      console.error("Streaming error:", err);
      res.status(500).send("Error streaming audio");
    })
    .pipe(res)
    .on("finish", () => {
      console.log("Streaming finished successfully");
    });
});

app.get("/stream", (req, res) => {
  const videoUrl = "https://www.youtube.com/watch?v=toyIRrgV5U0";
  const option = {
    filter: "audioonly",
    highWaterMark: 1048576 / 4,
  };

  const stream = ytdl(videoUrl, option);
  stream.on("error", (err) => {
    console.log("ytdl error\n", err);
  });
  stream.pipe(fs.createWriteStream(`./song_temp_cache/toyIRrgV5U0.mp3`));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
