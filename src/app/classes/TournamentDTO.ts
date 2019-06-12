import { MatchDTO } from './MatchDTO';

export class TournamentDTO {
    uid: string;
	name: string;
	matches: MatchDTO[];
	currentRound: number;
	status: string;
}
