const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../docs'),prefix='/Data-consulting-business/';
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.xml':'application/xml'};
http.createServer((req,res)=>{let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400).end();return}if(!pathname.startsWith(prefix)){res.writeHead(404).end();return}
const file=path.resolve(root,pathname.slice(prefix.length)||'index.html');
if(!file.startsWith(root+path.sep)||!mime[path.extname(file)]||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404).end();return}
res.writeHead(200,{'Content-Type':mime[path.extname(file)]});fs.createReadStream(file).pipe(res)
}).listen(4173,'127.0.0.1');
