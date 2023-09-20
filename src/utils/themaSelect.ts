import { Thema } from "./constants";
import { PrismaClient } from "@prisma/client";

export const themaSelect = async (thema: Thema[]) => {
    const prisma = new PrismaClient();
    const randomIndex = Math.floor(Math.random() * thema.length);
    const savedThema = await prisma.thema.create({
        data: {
            text: thema[randomIndex].text,
        },
    });

    console.log(savedThema)
    return savedThema.text
}
