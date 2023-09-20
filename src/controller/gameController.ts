import { Room } from "../models/room"
import { themaSelect } from "../utils/themaSelect"
import { Thema, thema } from "../utils/constants"

export const game = (io: any, room: Room) => {
    const members = room.members
    const selectedThema = themaSelect(thema)
    members.map((item, index) => {
        
    })
}
