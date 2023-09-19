import express, { Request, Response } from 'express';
import http from 'http';

const app = express();
const port = 8000;
const server = http.createServer(app);

const io = require('socket.io')(server);

io.on('connection', (socket: any) => {
    socket.emit('kurakke', 'kurakke')
});

app.get('/', (req: Request, res: Response) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
