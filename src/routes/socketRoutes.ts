import { handleJoinOrCreateRoom } from '../controller/roomController';
import { game } from '../controller/gameController';
import { RoomManager } from '../models/roomManager';

export const setupSocket = (io: any) => {
    io.on('connection', (socket: any) => {
        socket.emit('kurakke', 'kurakke');
        const roomManager = new RoomManager();
        socket.on('joinOrCreateRoom', (passphrase: string, nickname: string) => {
            const room = roomManager.joinOrCreateRoom(socket.id, passphrase, nickname);
            socket.join(room.passphrase);
            io.to(room.passphrase).emit('roomMembers',room.members)
        });
        socket.on('gamestart', (roomPassphrase: string) => {
            const gameRoom = roomManager.findRoomByPassphrase(roomPassphrase);
            if(gameRoom && gameRoom.canStartGame()) {
                io.to(roomPassphrase).emit('gamestart');
                game(socket, gameRoom);
            }
        })
    });
};
