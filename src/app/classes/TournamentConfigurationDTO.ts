import { TournamentSettings } from './TournamentSettings';
import { Player } from './Player';

export class TournamentConfigurationDTO {
    name: string;
    settings: TournamentSettings;
    selectedPlayer: Player[];
}
