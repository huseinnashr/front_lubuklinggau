const path = require('path');
const express = require('express');
const compression = require('compression')
const http = require('http');

const app = express();

app.use(compression({ level: 9 }))
app.use(express.static(path.join(__dirname, 'dist')));

const port = process.env.PORT || '80';
const host = process.env.HOST || '0.0.0.0';

const server = http.createServer(app);
server.listen(port, host, () => console.log(`Serving on localhost:${port}`));