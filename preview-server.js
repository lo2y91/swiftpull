// Local preview of the site: node preview-server.js  →  http://localhost:8765
// (Only for looking at the page before publishing; GitHub Pages serves the real one.)
const http = require("http");
const fs = require("fs");
const path = require("path");
const types = { ".html": "text/html; charset=utf-8", ".png": "image/png", ".js": "text/javascript", ".css": "text/css" };
http.createServer((req, res) => {
  const rel = decodeURIComponent(req.url.split("?")[0]).replace(/^\/+/, "") || "index.html";
  const file = path.join(__dirname, rel);
  if (!file.startsWith(__dirname) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404);
    return res.end("not found");
  }
  res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
}).listen(8765, "127.0.0.1");
