const https = require("https");

const query = encodeURIComponent("Community Coffee Breakfast Blend 40 count packets site:amazon.com");
const url = `https://html.duckduckgo.com/html/?q=${query}`;

console.log(`Fetching: ${url}`);

const options = {
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  }
};

https.get(url, options, (res) => {
  let data = "";
  res.on("data", (chunk) => { data += chunk; });
  res.on("end", () => {
    console.log(`Status code: ${res.statusCode}`);
    
    // Find all links containing amazon.com
    const amazonRegex = /href="([^"]*amazon\.com[^"]*)"/gi;
    const links = [];
    let match;
    while ((match = amazonRegex.exec(data)) !== null) {
      links.push(match[1]);
    }
    
    console.log("Amazon Links found:", links);
    
    // Check if DuckDuckGo is showing a robot check/no results
    if (data.includes("ddg-ltd")) {
      console.log("Looks like DDG might be rate limiting or showing no results.");
    }
    if (data.includes("No results")) {
      console.log("DuckDuckGo returned 'No results'.");
    }
  });
}).on("error", (err) => {
  console.error("Error:", err.message);
});
