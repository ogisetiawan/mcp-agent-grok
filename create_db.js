const https = require('https');
require("dotenv").config();

const data = JSON.stringify({
  parent: { type: "page_id", page_id: process.env.PAGES_ID},
  title: [{ type: "text", text: { content: "B. Market Regime" } }],
  properties: {
    Week: { title: {} },
    "Tanggal Review": { date: {} },
    "Index Utama": {
      select: {
        options: [
          { name: "IHSG", color: "green" },
          { name: "S&P", color: "blue" },
          { name: "Nasdaq", color: "purple" },
          { name: "Lainnya", color: "gray" }
        ]
      }
    },
    "Trend Index": {
      select: {
        options: [
          { name: "Uptrend", color: "green" },
          { name: "Sideways", color: "yellow" },
          { name: "Downtrend", color: "red" }
        ]
      }
    },
    "Market Sentiment": {
      select: {
        options: [
          { name: "Extream Fear", color: "red" },
          { name: "Fear", color: "orange" },
          { name: "Neutral", color: "yellow" },
          { name: "Greed", color: "green" },
          { name: "Extream Greed", color: "purple" }
        ]
      }
    },
    "Leading Sector": {
      select: {
        options: [
          { name: "Finance", color: "blue" },
          { name: "Properti & Real Estate", color: "orange" },
          { name: "Infrastruktur", color: "green" },
          { name: "Energi", color: "red" },
          { name: "Lainnya", color: "gray" }
        ]
      }
    },
    "Market Mode": {
      select: {
        options: [
          { name: "Green", color: "green" },
          { name: "Yellow", color: "yellow" },
          { name: "Red", color: "red" }
        ]
      }
    },
    "% Risk Trade": { number: {} },
    "Max Posisi Baru": { number: {} },
    "Event Besar": { rich_text: {} },
    Summary: { rich_text: {} }
  }
});

const options = {
  hostname: 'api.notion.com',
  path: '/v1/databases',
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + process.env.NOTION_API_KEY,
    'Content-Type': 'application/json',
    'Notion-Version': '2022-06-28',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', body);
  });
});

req.on('error', (e) => console.error('Error:', e));
req.write(data);
req.end();