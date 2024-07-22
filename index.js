const express = require("express");
const ytdl = require("@distube/ytdl-core");
const cors = require("cors"); // Import cors
const app = express();
const port = 3000;

app.use(cors()); // Gunakan middleware cors

app.get("/audio", (req, res) => {
  const videoUrl = req.query.url; // Ambil URL video dari parameter query

  if (!videoUrl) {
    return res.status(400).send("Video URL is required");
  }

  console.log(`Request for video URL: ${videoUrl}`);

  res.header("Content-Type", "audio/mpeg");
  ytdl(videoUrl, { filter: "audioonly" })
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
  const stream = ytdl(videoUrl, { filter: "audioonly" });

  // Set header for audio stream
  res.setHeader("Content-Type", "audio/mpeg");

  // Pipe the audio stream to the response
  stream.pipe(res);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
