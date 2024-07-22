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

  res.header("Content-Type", "audio/mpeg");
  ytdl(videoUrl, { filter: "audioonly" })
    .on("error", (err) => {
      console.error("Error:", err);
      res.status(500).send("Error streaming audio");
    })
    .pipe(res);
});

app.listen(port, () => {
  console.log(`Server running at port 3000`);
});
