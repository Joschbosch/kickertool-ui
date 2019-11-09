export class Player {
    constructor(public uid: string, public firstName: string, public lastName: string) {}

    public static createFromJSON(jsonPlayer: Player) {
        return new Player(
            jsonPlayer.uid,
            jsonPlayer.firstName,
            jsonPlayer.lastName
        );
    }

    getFullName(): string {
        return this.firstName + ' ' + this.lastName;
    }
}
