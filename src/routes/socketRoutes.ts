import { handleJoinOrCreateRoom } from '../controller/roomController';
import { game } from '../controller/gameController';
import { RoomManager } from '../models/roomManager';

export const setupSocket = (io: any) => {
    io.on('connection', (socket: any) => {
        socket.emit('kurakke', 'kurakke');
        socket.on('joinOrCreateRoom', (passphrase: string, nickname: string) => {
            const roomManager = new RoomManager();
            const room = roomManager.joinOrCreateRoom(passphrase, nickname);
            socket.join(room.passphrase);
            socket.to(room.passphrase).emit('roomMembers',room.members)
            socket.on('gamestart', (roomPassphrase: string) => {
                const gameRoom = roomManager.findRoomByPassphrase(roomPassphrase);
                if(gameRoom && room.canStartGame()) {
                    io.to(roomPassphrase).emit('gamestart');
                    game(socket, room);
                }
            })
        });
    });
};
