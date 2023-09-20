import express, { Request, Response } from 'express';
import http from 'http';
import { Room } from './models/room';
const app = express();
const port = 8000;
const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const rooms: Room[] = [];

io.on('connection', (socket: any) => {
    socket.emit('kurakke', 'kurakke')
    socket.on('joinOrCreateRoom', (passphrase:string) => {
        let room = rooms.find(r => r.passphrase === passphrase);
        console.log(`kurakke ${room}`);
        if (!room) {
            room = new Room(passphrase);
            rooms.push(room);
        }
        room.members.push(socket.id);
        socket.join(passphrase);
        socket.emit('joinedRoom', passphrase);
    });
});

app.get('/', (req: Request, res: Response) => res.send('Hello World!'));

server.listen(port, () => console.log(`Example app listening on port ${port}!`));
