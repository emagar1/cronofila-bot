// api/index.js (Vercel Serverless Function en CommonJS)
const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "Missing url" });

  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const data = {
      title: $("title").text() || null,
      h1: $("h1").first().text() || null,
      bodyText: $("body").text().trim().slice(0, 300)
    };

    return res.status(200).json({ ok: true, data });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

