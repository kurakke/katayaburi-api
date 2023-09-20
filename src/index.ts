import express, { Request, Response } from 'express';
import http from 'http';
import { Room } from './models/room';
import { v4 as uuidv4, v4 } from 'uuid';
import { setupSocket } from './routes/socketRoutes';

const app = express();
const port = 8000;
const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

setupSocket(io);

app.get('/', (req: Request, res: Response) => res.send('Hello World!'));

server.listen(port, () => console.log(`Example app listening on port ${port}!`));
