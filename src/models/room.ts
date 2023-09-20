import { v4 as uuid } from 'uuid'
export interface Player {
    id: string;
    nickname: string;
}

export class Room {
    passphrase: string;
    members: Player[] = [];
    gameStarted: boolean = false;

    constructor(passphrase: string) {
        this.passphrase = passphrase;
    }

    addMember(member: Player): void {
        this.members.push(member);
    }

    removeMember(memberId: string): void {
        const index = this.members.findIndex(member => member.id === memberId);
        if (index !== -1) {
            this.members.splice(index, 1);
        }
    }

    memberCount(): number {
        return this.members.length;
    }

    canStartGame(): boolean {
        return this.memberCount() >= 3;
    }

    startGame(triggeredBy: string): string {
        if (!this.canStartGame()) {
            return "Not enough members to start the game.";
        }
        if (this.gameStarted) {
            return "Game is already started!";
        }
        const isMember = this.members.some(member => member.id === triggeredBy);
        if (isMember) {
            this.gameStarted = true;
            return "Game has started!";
        }
        return `${triggeredBy} is not a member of this room.`;
    }
}
