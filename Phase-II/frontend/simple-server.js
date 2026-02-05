// Simple HTTP server as a temporary workaround
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const server = http.createServer((req, res) => {
  console.log(`Request received: ${req.method} ${req.url}`);

  // For the root path, serve a simple index page
  if (req.url === '/' || req.url === '/index.html') {
    const indexPath = path.join(__dirname, 'src', 'app', 'page.tsx');
    
    // Try to serve the Next.js page if it exists
    if (fs.existsSync(indexPath)) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Todo App Frontend</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            h1 { color: #333; }
          </style>
        </head>
        <body>
          <h1>Todo App Frontend</h1>
          <p>Next.js development server is having issues. This is a temporary static page.</p>
          <p>Status: Waiting for Next.js installation to be fixed...</p>
        </body>
        </html>
      `);
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('<h1>Todo App Frontend Placeholder</h1><p>Next.js development server is having issues.</p>');
    }
    return;
  }

  // Handle favicon
  if (req.url === '/favicon.ico') {
    res.writeHead(204);
    res.end();
    return;
  }

  // For other requests, respond with a simple message
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Todo App Frontend - Server running on port 3000\nNext.js installation needs to be fixed.');
});

server.listen(PORT, () => {
  console.log(`Simple server running on http://localhost:${PORT}`);
});