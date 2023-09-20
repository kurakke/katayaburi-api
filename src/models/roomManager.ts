import { Room } from "./room";
import { Player } from "./room";

export class RoomManager {
    private rooms: Room[] = [];

    addRoom(room: Room): void {
        this.rooms.push(room);
    }

    findRoomByPassphrase(passphrase: string): Room | undefined {
        return this.rooms.find(room => room.passphrase === passphrase);
    }

    joinOrCreateRoom(id: string, passphrase: string, nickname: string): Room {
        let room = this.findRoomByPassphrase(passphrase);
        const player: Player = {
            id: id,
            nickname: nickname,
        };
        if (!room) {
            room = new Room(passphrase);
            this.addRoom(room);
        }
        room.addMember(player);
        return room;
    }
}
