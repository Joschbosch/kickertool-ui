import { PlayerStatus } from './PlayerStatus.enum';

export class Player {

    uid: string;
    status: PlayerStatus;

    constructor(
        public firstName: string,
        public lastName: string,
        public isDummyPlayer: boolean
    ) {
        this.uid = '';
        this.status = PlayerStatus.UNDEFINED;
    }

    public static createFromJSON(jsonPlayer: Player) {
        var newPlayer = new Player(
            jsonPlayer.firstName,
            jsonPlayer.lastName,
            jsonPlayer.isDummyPlayer
        );

        newPlayer.uid = jsonPlayer.uid;
        newPlayer.status = jsonPlayer.status;
        return newPlayer;
    }

    getFullName(): string {
        return this.firstName + ' ' + this.lastName;
    }

    isPausing(): boolean {
        return this.status === PlayerStatus.PAUSING_TOURNAMENT;
    }
}
