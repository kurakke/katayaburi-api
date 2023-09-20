import { log } from "console";
import { Room } from "./room";
import { Player } from "./room";
import { PrismaClient } from "@prisma/client";
export class RoomManager {
    private rooms: Room[] = [];

    addRoom(room: Room): void {
        this.rooms.push(room);
    }

    findRoomByPassphrase(passphrase: string): Room | undefined {
        return this.rooms.find(room => room.passphrase === passphrase);
    }

    async joinOrCreateRoom(id: string, passphrase: string, nickname: string): Promise<Room> {
        const prisma = new PrismaClient();
        let room = this.findRoomByPassphrase(passphrase);
        const player: Player = {
            id: id,
            nickname: nickname,
        };
        if (!room) {
            room = new Room(passphrase);
            this.addRoom(room);
        }
        const user = await prisma.user.create({
            data: {
                id: id,
                nickname: nickname,
            }
        });
        room.addMember(user);
        console.log(user);
        return room;
    }
}
