import { TournamentSettings } from './TournamentSettings';
import { Player } from './Player';

export class TournamentConfiguration {
    name?: string;
    settings: TournamentSettings;
    selectedPlayer?: Player[];
}
