const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;
const wwwDir = path.join(__dirname, 'www');

app.use('/assets', express.static(path.join(wwwDir, 'assets')));

app.get('/', (req, res) => {
  const indexPath = path.join(wwwDir, 'index.html');
  let html = fs.readFileSync(indexPath, 'utf8');
  const appJsPath = path.join(wwwDir, 'assets', 'app.js');
  let timestamp = 0;
  try {
    timestamp = fs.statSync(appJsPath).mtime.getTime();
  } catch (e) {
    console.warn('app.js not found:', e.message);
  }
  html = html.replace('{{timestamp}}', timestamp);
  res.send(html);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
