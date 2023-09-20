import { Room } from "../models/room"
import { themaSelect } from "../utils/themaSelect"
import { thema } from "../utils/constants"

export const game = (socket: any, room: Room) => {
    const members = room.members
    const selectedThema = themaSelect(thema)
    const relayMessageToEachUser = members.map((member, index) => {
        return async (prevMessage: string) => {
            // 最初のメンバーには selectedThema を、それ以外のメンバーには前のメンバーからのメッセージを送る
            const msgToSend = index === 0 ? selectedThema : prevMessage;
            socket.to(member.id).emit('yourTurn', msgToSend);

            // メンバーからの応答を待つ
            return new Promise<string>((resolve) => {
                socket.on(`response-${member.id}`, (message: string) => {
                    resolve(message); // メンバーからのメッセージでPromiseを解決
                });
            });
        };
    });

    relayMessageToEachUser.reduce(async (prevPromise, currentFunc) => {
        const prevMessage = await prevPromise;
        return currentFunc(prevMessage);
    }, Promise.resolve('')).then(() => {
        console.log('end');
    });
}
