import { PlayerStatus } from './PlayerStatus.enum';

export class Player {
    constructor(
        public uid: string,
        public firstName: string,
        public lastName: string,
        public status: PlayerStatus,
        public isDummyPlayer: boolean
    ) {}

    public static createFromJSON(jsonPlayer: Player) {
        return new Player(
            jsonPlayer.uid,
            jsonPlayer.firstName,
            jsonPlayer.lastName,
            jsonPlayer.status,
            jsonPlayer.isDummyPlayer
        );
    }

    getFullName(): string {
        return this.firstName + ' ' + this.lastName;
    }

    isPausing(): boolean {
        console.log('Player Status: ' + this.status);
        return this.status === PlayerStatus.PAUSING_TOURNAMENT;
    }
}
