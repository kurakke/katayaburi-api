import { Thema } from "./constants";

export const themaSelect = (thema: Thema[]):Thema => {
    const randomIndex = Math.floor(Math.random() * thema.length);

    console.log(thema[randomIndex].text)
    return thema[randomIndex];
}
