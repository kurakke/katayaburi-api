export class Room {
    passphrase: string;
    members: string[] = [];
    gameStarted: boolean = false;

    constructor(passphrase: string) {
        this.passphrase = passphrase;
    }

    addMember(member: string): void {
        this.members.push(member);
    }

    removeMember(member: string): void {
        const index = this.members.indexOf(member);
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
        if (this.members.includes(triggeredBy)) {
            this.gameStarted = true;
            return "Game has started!";
        }
        return `${triggeredBy} is not a member of this room.`;
    }
}
