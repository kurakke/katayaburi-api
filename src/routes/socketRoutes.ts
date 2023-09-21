import { game } from '../controller/gameController';
import { RoomManager } from '../models/roomManager';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const setupSocket = (io: any) => {
    io.on('connection', (socket: any) => {
        socket.emit('kurakke', 'kurakke');
        const roomManager = new RoomManager();
        socket.on('joinOrCreateRoom', async (passphrase: string, nickname: string) => {
            const room = await roomManager.joinOrCreateRoom(socket.id, passphrase, nickname);
            const users = await prisma.user.findMany({
                where: {
                    room_id: room.id
                }
            })
            socket.join(room.id);
            io.to(room.id).emit('roomMembers', users)
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
