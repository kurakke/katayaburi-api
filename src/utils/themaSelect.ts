import { Thema } from "./constants";
import { PrismaClient } from "@prisma/client";

export const themaSelect = (thema: Thema[]) => {
    const randomIndex = Math.floor(Math.random() * thema.length);

    console.log(thema[randomIndex].text)
    return thema[randomIndex].text
}
