
// api/index.js (Vercel Serverless Function)
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "Missing url" });

  try {
    const html = await fetch(url).then(r => r.text());
    const $ = cheerio.load(html);

    // Basic extraction example (modify as needed)
    const data = {
      title: $("title").text() || null,
      h1: $("h1").first().text() || null,
      bodyText: $("body").text().trim().slice(0,300) // preview
    };

    res.json({ ok: true, data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
