import { log } from 'console';
import { Room } from '../models/room';
import { v4 as uuid } from 'uuid'
import { Player } from '../models/room';

const rooms: Room[] = [];

export const handleJoinOrCreateRoom = (passphrase: string, nickname: string) => {
    let room = rooms.find(r => r.passphrase === passphrase);
    if (!room) {
        room = new Room(passphrase);
        rooms.push(room);
    }
    const userId = uuid();
    
    const player = {
        id: userId,
        nickname: nickname
    }
    room.addMember(player);
    console.log(room.members)
    return room;
};
