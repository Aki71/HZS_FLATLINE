const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  
    const baseDirectory = __dirname;

    const filePath = path.join(baseDirectory, req.url === '/' ? 'index.html' : req.url);

  
    fs.exists(filePath, (exists) => {
        if (!exists) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
            return;
        }

        fs.readFile(filePath, 'binary', (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }

          
            const contentType = getContentType(filePath);
            
            res.writeHead(200, { 'Content-Type': contentType });
            res.write(content, 'binary');
            res.end();
        });
    });
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

function getContentType(filePath) {
    const extname = path.extname(filePath);
    switch (extname) {
        case '.html':
            return 'text/html';
        case '.js':
            return 'text/javascript';
        case '.css':
            return 'text/css';
        case '.png':
            return 'image/png';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        default:
            return 'application/octet-stream';
    }
}
