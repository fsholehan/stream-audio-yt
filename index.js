import express from "express";
import { JSDOM } from "jsdom";
import { Innertube, UniversalCache } from "youtubei.js";
import fetch from "node-fetch"; // ES Module version of fetch
import { BG } from "bgutils-js"; // Update this path if needed

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/audio-url/:videoId", async (req, res) => {
  try {
    const videoId = req.params.videoId;
    let innertube = await Innertube.create({ retrieve_player: false });

    const requestKey = "O43z0dpjhgX20SCx4KAo";
    const visitorData = innertube.session.context.client.visitorData;

    const dom = new JSDOM();

    Object.assign(globalThis, {
      window: dom.window,
      document: dom.window.document,
    });

    const bgConfig = {
      fetch: (url, options) => fetch(url, options),
      globalObj: globalThis,
      identifier: visitorData,
      requestKey,
    };

    const challenge = await BG.Challenge.create(bgConfig);

    if (!challenge) {
      throw new Error("Could not get challenge");
    }

    if (challenge.script) {
      const script = challenge.script.find((sc) => sc !== null);
      if (script) new Function(script)();
    } else {
      console.warn("Unable to load Botguard.");
    }

    const poToken = await BG.PoToken.generate({
      program: challenge.challenge,
      globalName: challenge.globalName,
      bgConfig,
    });

    const placeholderPoToken = BG.PoToken.generatePlaceholder(visitorData);

    console.log("Session Info:", {
      visitorData,
      placeholderPoToken,
      poToken,
    });

    console.log("\n");

    innertube = await Innertube.create({
      po_token: poToken,
      visitor_data: visitorData,
      cache: new UniversalCache(),
      generate_session_locally: true,
    });

    const info = await innertube.getBasicInfo(videoId);
    const audioStreamingURL = info
      .chooseFormat({ quality: "best", type: "audio" })
      .decipher(innertube.session.player);

    res.json({ audioStreamingURL });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving audio streaming URL");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
