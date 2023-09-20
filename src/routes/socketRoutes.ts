import { handleJoinOrCreateRoom } from '../controller/roomController';
import { game } from '../controller/gameController';
export const setupSocket = (io: any) => {
    io.on('connection', (socket: any) => {
        socket.emit('kurakke', 'kurakke');
        socket.on('joinOrCreateRoom', (passphrase: string, nickname: string) => {
            const room = handleJoinOrCreateRoom(passphrase, nickname);
            socket.join(room.passphrase);
            socket.to(room.passphrase).emit('roomMembers',room.members)
            socket.on('gamestart', (roomPassphrase: string) => {
                if(room.canStartGame()) {
                    io.to(roomPassphrase).emit('gamestart');
                    game(socket, room);
                }
            })
        });
    });
};
