require("dotenv").config();

const https = require("https");

const databaseId = process.env.DATABASE_ID;
const notionToken = process.env.NOTION_TOKEN;

const data = JSON.stringify({
properties: {

  "Review Date": {
    date: {}
  },

  "Action Plan": {
    select: {
      options: [
        { name: "Hold", color: "blue" },
        { name: "Avg Down", color: "yellow" },
        { name: "Trim", color: "orange" },
        { name: "Sell All", color: "red" }
      ]
    }
  },

  "Action Price": {
    number: {
      format: "number"
    }
  },

  "Action Note": {
    rich_text: {}
  }

}
});

const options = {
  hostname: "api.notion.com",
  path: `/v1/databases/${databaseId}`,
  method: "PATCH",
  headers: {
    Authorization: `Bearer ${notionToken}`,
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28",
    "Content-Length": Buffer.byteLength(data)
  }
};

const req = https.request(options, (res) => {
  let body = "";

  res.on("data", (chunk) => {
    body += chunk;
  });

  res.on("end", () => {
    console.log("Status:", res.statusCode);

    try {
      console.log(JSON.stringify(JSON.parse(body), null, 2));
    } catch {
      console.log(body);
    }
  });
});

req.on("error", (err) => {
  console.error("Error:", err);
});

req.write(data);
req.end();