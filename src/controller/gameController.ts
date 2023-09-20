import { Room } from "../models/room"
import { themaSelect } from "../utils/themaSelect"
import { Thema, thema } from "../utils/constants"
import { PrismaClient } from "@prisma/client"

export const game = (socket: any, room: Room) => {
    const members = room.members
    const selectedThema = themaSelect(thema)
    const prisma = new PrismaClient()
    const gameLog = async (thema: Thema) => {
        const res = await prisma.gamelog.create({
            data: {
                Thema: {
                    create: {
                        text: thema.text
                    }
                }

            }
        })
        return res;
    }
    const GameLog = gameLog(selectedThema);
    const relayMessageToEachUser = members.map((member, index) => {
        return async (prevMessage: string) => {
            // 最初のメンバーには selectedThema を、それ以外のメンバーには前のメンバーからのメッセージを送る
            const msgToSend = index === 0 ? selectedThema : prevMessage;
            socket.to(member.id).emit('yourTurn', msgToSend);

            // メンバーからの応答を待つ
            return new Promise<string>((resolve) => {
                socket.on(`response-${member.id}`,async (message: string) => {
                    await prisma.answer.create({
                        data:{
                            text:message,
                            gamelog_id: (await GameLog).id,
                            user_id: member.id,
                        }
                    })
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
