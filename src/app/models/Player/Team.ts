import { Player } from './Player';

export class Team {

    public static createFromJSON(jsonTeam: Team) {
        return new Team(Player.createFromJSON(jsonTeam.player1), Player.createFromJSON(jsonTeam.player2));
    }

    constructor(public player1: Player, public player2: Player) {}
}
