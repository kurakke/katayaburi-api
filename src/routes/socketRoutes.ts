import { handleJoinOrCreateRoom } from '../controller/roomController';
import { game } from '../controller/gameController';
export const setupSocket = (io: any) => {
    io.on('connection', (socket: any) => {
        socket.emit('kurakke', 'kurakke');
        socket.on('joinOrCreateRoom', (passphrase: string, nickname: string) => {
            const room = handleJoinOrCreateRoom(passphrase, nickname);
            socket.join(room.passphrase);
            socket.emit('joinedRoom', room.passphrase);
            socket.on('gamestart', (roomId: string) => {
                if(room.canStartGame()) {
                    io.to(roomId).emit('gamestart');
                    game(socket, room);
                }
            })
        });
    });
};
