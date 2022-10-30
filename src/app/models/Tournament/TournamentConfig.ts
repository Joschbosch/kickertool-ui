import { Player } from '../Player/Player';
import { TournamentSettings } from './TournamentSettings';

export class TournamentConfig {
    selectedPlayer: Player[];

    public static createFromJSON(jsonConfig: TournamentConfig) {
        return new TournamentConfig(
            jsonConfig.name,
            TournamentSettings.createFromJSON(jsonConfig.settings)
        );
    }

    constructor(public name: string, public settings: TournamentSettings) {
        this.selectedPlayer = [];
    }

    public addPlayerToSelection(newPlayer: Player) {
        this.selectedPlayer.push(newPlayer);
    }
}
