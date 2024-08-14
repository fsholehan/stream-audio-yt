import express from "express";
import ytdl from "@distube/ytdl-core";
import cors from "cors";
import fetch from "node-fetch";
import { Innertube } from "youtubei.js";
const app = express();
const port = 3000;

app.use(cors());

const visitor_data = "CgtHUG9CV2Vwd2dwYyiGpvK1BjIKCgJJRBIEGgAgEw%3D%3D";
const po_token =
  "MnSe1poeIxntVJ7u03bR8k0uVo21qRNNHwoejmgwRSxo7JvefEFOQM-powp9s_W1G_OMxdlgjSIfACyseLFm1OrWBcT0FWO-TAaHqzgrKTfbPZJ6Y2Nu40iujuZ885Kp0tgBGpiwcF1eDxzFa12HVuqNGSHqQQ==";

const cookies = [
  {
    domain: ".youtube.com",
    expirationDate: 1757030793.225653,
    hostOnly: false,
    httpOnly: false,
    name: "__Secure-1PAPISID",
    path: "/",
    sameSite: "unspecified",
    secure: true,
    session: false,
    storeId: "0",
    value: "yzMMDd0oryxTCWdr/AuML5_DSvHdx4RYB2",
    id: 1,
  },
  {
    domain: ".youtube.com",
    expirationDate: 1757030793.225847,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-1PSID",
    path: "/",
    sameSite: "unspecified",
    secure: true,
    session: false,
    storeId: "0",
    value:
      "g.a000mQh-1KWsI_shpuaMVajqpKEw0T3qnYKPnik1CfcNsS9GNqZr9ZUoRapWsZMuyN03raEKMwACgYKAZoSARMSFQHGX2MiCumgRyqmwwdhOVobDFql9RoVAUF8yKowBTMgkdfGbwv8GQO-rS0f0076",
    id: 2,
  },
  {
    domain: ".youtube.com",
    expirationDate: 1754603206.704662,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-1PSIDCC",
    path: "/",
    sameSite: "unspecified",
    secure: true,
    session: false,
    storeId: "0",
    value:
      "AKEyXzXk8SSx6UrmlhWgBRDegcHcY_HLVCWp2DwGPEjX8Pkj594e0By0XDKt8d97zpJobXmauA",
    id: 3,
  },
  {
    domain: ".youtube.com",
    expirationDate: 1754603200.194701,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-1PSIDTS",
    path: "/",
    sameSite: "unspecified",
    secure: true,
    session: false,
    storeId: "0",
    value:
      "sidts-CjIB4E2dkWfDlbUeRxHGhLz-ljca3z3u8Dgyi71GLwyhEEZz92J5mCLR81WOD1R8WpNhaBAA",
    id: 4,
  },
  {
    domain: ".youtube.com",
    expirationDate: 1757030793.225685,
    hostOnly: false,
    httpOnly: false,
    name: "__Secure-3PAPISID",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: "0",
    value: "yzMMDd0oryxTCWdr/AuML5_DSvHdx4RYB2",
    id: 5,
  },
  {
    domain: ".youtube.com",
    expirationDate: 1757030793.225878,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-3PSID",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: "0",
    value:
      "g.a000mQh-1KWsI_shpuaMVajqpKEw0T3qnYKPnik1CfcNsS9GNqZr-Pf0ltYNfJYTM5GEXWfljQACgYKAVwSARMSFQHGX2MixrEf5VAV9e4R8f6-hQm0IBoVAUF8yKpzfUKCHJqvEEpIec_pxcpz0076",
    id: 6,
  },
  {
    domain: ".youtube.com",
    expirationDate: 1754603206.704722,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-3PSIDCC",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: "0",
    value:
      "AKEyXzURd-WB8GwGU9lEzcgxunlk9MRV_Mhg7ExFfb44a2SBgGAkRYjMNv-c3zHIVbtnJs8pJB8",
    id: 7,
  },
  {
    domain: ".youtube.com",
    expirationDate: 1754603200.194844,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-3PSIDTS",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: "0",
    value:
      "sidts-CjIB4E2dkWfDlbUeRxHGhLz-ljca3z3u8Dgyi71GLwyhEEZz92J5mCLR81WOD1R8WpNhaBAA",
    id: 8,
  },
  {
    domain: ".youtube.com",
    expirationDate: 1757030793.225588,
    hostOnly: false,
    httpOnly: false,
    name: "APISID",
    path: "/",
    sameSite: "unspecified",
    secure: false,
    session: false,
    storeId: "0",
    value: "9pDyyMcKdGxVyabS/AIMYHlIL_TCTuGoEH",
    id: 9,
  },
  {
    domain: ".youtube.com",
    expirationDate: 1734738468.956105,
    hostOnly: false,
    httpOnly: false,
    name: "CONSENT",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: "0",
    value: "YES+ID.en+20160904-14-0",
    id: 10,
  },
  {
    domain: ".youtube.com",
    expirationDate: 1757030793.225387,
    hostOnly: false,
    httpOnly: true,
    name: "HSID",
    path: "/",
    sameSite: "unspecified",
    secure: false,
    session: false,
    storeId: "0",
    value: "AR9rtZy9F24MGu9AV",
    id: 11,
  },
  {
    domain: ".youtube.com",
    expirationDate: 1757030793.143219,
    hostOnly: false,
    httpOnly: true,
    name: "LOGIN_INFO",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: "0",
    value:
      "AFmmF2swRQIgLFjH2Arbs5Kiiu5liX-5OuyKbyj3w9Zz7Vwk2zo5rRoCIQDblgqql1xXARcPSPd2PkU26cJgumqwtVXJAji6gUIMxQ:QUQ3MjNmdzJfdlFRUHBZenJKQ3V3anpGalB6bWZnSlZQZTdCS2VsUy1TR0kzMktQY01WSkhOUHhUWFVOQWt1Z0lzMmdrbjNDOE90RnpxZllxNGpLdkktazlDX3dfempOQ3ZOVFJFODhZbzdSMHZyc19HN3ZrMDUxejdxUkhZOXZoQURVRFhlVW5TV193emV0bzV6cFlYcktiQ2t2Z3A2VTlR",
    id: 12,
  },
  {
    domain: ".youtube.com",
    expirationDate: 1757627204.155478,
    hostOnly: false,
    httpOnly: false,
    name: "PREF",
    path: "/",
    sameSite: "unspecified",
    secure: true,
    session: false,
    storeId: "0",
    value:
      "HIDDEN_MASTHEAD_ID=68R75waVwJU&tz=Asia.Jakarta&al=id&f1=50000000&f5=20030&volume=100&library_tab_browse_id=FEmusic_liked_playlists&f4=4000000&f7=100",
    id: 13,
  },
  {
    domain: ".youtube.com",
    expirationDate: 1757030793.225622,
    hostOnly: false,
    httpOnly: false,
    name: "SAPISID",
    path: "/",
    sameSite: "unspecified",
    secure: true,
    session: false,
    storeId: "0",
    value: "yzMMDd0oryxTCWdr/AuML5_DSvHdx4RYB2",
    id: 14,
  },
  {
    domain: ".youtube.com",
    expirationDate: 1757030793.225817,
    hostOnly: false,
    httpOnly: false,
    name: "SID",
    path: "/",
    sameSite: "unspecified",
    secure: false,
    session: false,
    storeId: "0",
    value:
      "g.a000mQh-1KWsI_shpuaMVajqpKEw0T3qnYKPnik1CfcNsS9GNqZroM8xPNW5-kv7FI9fd1iQDwACgYKAfUSARMSFQHGX2MidnPvi0s4cSa4M4MumLhm8xoVAUF8yKpYcBNHJsW8VxkMLHMGevWn0076",
    id: 15,
  },
  {
    domain: ".youtube.com",
    expirationDate: 1754603206.704515,
    hostOnly: false,
    httpOnly: false,
    name: "SIDCC",
    path: "/",
    sameSite: "unspecified",
    secure: false,
    session: false,
    storeId: "0",
    value:
      "AKEyXzXQyH8CmOIOooOmI4FLdcAnqXe5o8aA76OJrrS50l9Dvb10Zb4WTp9dJuJLApMMRgteGFQ",
    id: 16,
  },
  {
    domain: ".youtube.com",
    expirationDate: 1757030793.225535,
    hostOnly: false,
    httpOnly: true,
    name: "SSID",
    path: "/",
    sameSite: "unspecified",
    secure: true,
    session: false,
    storeId: "0",
    value: "AFHwXyKwLWWTf2wXo",
    id: 17,
  },
];

const uri_proxy = "http://152.26.229.66:9443";

const agent = ytdl.createProxyAgent({ uri: uri_proxy }, cookies);

app.get("/audio", (req, res) => {
  const videoUrl = req.query.url; // Ambil URL video dari parameter query

  if (!videoUrl) {
    return res.status(400).send("Video URL is required");
  }

  res.header("Content-Type", "audio/mpeg");
  ytdl(videoUrl, { filter: "audioonly", agent })
    .on("error", (err) => {
      console.error("Error:", err);
      res.status(500).send("Error streaming audio");
    })
    .pipe(res);
});

app.get("/stream/:videoId", async (req, res) => {
  const youtube = await Innertube.create({
    visitor_data,
  });
  try {
    const videoId = req.params.videoId;
    const pot = req.query.pot || po_token; // Jika `pot` tidak diberikan, gunakan nilai default

    const info = await youtube.getBasicInfo(videoId);
    const format = info.chooseFormat({ type: "audio", quality: "best" });

    if (!format) {
      return res.status(404).send("Audio format not found.");
    }

    let url = format?.decipher(youtube.session.player);

    if (!url) {
      return res.status(500).send("Failed to get the audio stream URL.");
    }

    // Tambahkan parameter `pot` ke URL jika diperlukan
    const urlWithPot = new URL(url);
    urlWithPot.searchParams.append("pot", pot);

    // Streaming data ke client
    fetch(urlWithPot.toString())
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch audio stream.");
        }
        res.setHeader("Content-Type", "audio/mpeg");
        response.body.pipe(res);
      })
      .catch((error) => {
        res.status(500).send(error.message);
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/audio-local", (req, res) => {
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
  console.log(`Server running at http://localhost:${port}/`);
});
