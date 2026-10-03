// Local build launcher: Node.js only, no package install and no external bind.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, 'dist');
const port = Number(process.env.UET_PORT || 5181);
const mime = { '.html':'text/html; charset=utf-8', '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.glb':'model/gltf-binary', '.png':'image/png', '.mp3':'audio/mpeg', '.wav':'audio/wav', '.wasm':'application/wasm' };
const server = http.createServer((req, res) => {
  try {
    const url = new URL(req.url, 'http://127.0.0.1');
    const name = decodeURIComponent(url.pathname);
    const file = path.resolve(root, '.' + (name === '/' ? '/index.html' : name));
    if (!file.startsWith(root + path.sep)) { res.writeHead(403);res.end();return; }
    fs.stat(file, (err, stat) => {
      if (err || !stat.isFile()) {res.writeHead(404);res.end('File not found');return;}
      res.writeHead(200, {'Content-Type':mime[path.extname(file)] || 'application/octet-stream','Content-Length':stat.size});
      fs.createReadStream(file).pipe(res);
    });
  } catch { res.writeHead(400);res.end('Bad URL'); }
});
server.on('error', error => { console.error(error.message + '\nĐổi UET_PORT hoặc đóng server cũ rồi mở lại.');process.exitCode=1; });
server.listen(port, '127.0.0.1', () => console.log(`Mở Chrome: http://127.0.0.1:${port}/?sample=p1&mute=1\nGiữ cửa sổ này mở. Ctrl+C để tắt server.`));
