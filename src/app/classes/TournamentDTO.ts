import { MatchDTO } from './MatchDTO';
import { TournamentSettings } from './TournamentSettings';

export class TournamentDTO {
    uid: string;
	name: string;
	matches: MatchDTO[];
	settings: TournamentSettings;
	currentRound: number;
	status: string;
}
