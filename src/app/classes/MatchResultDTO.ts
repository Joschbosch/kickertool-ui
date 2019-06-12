import { MatchDTO } from './MatchDTO';

export class MatchResultDTO {
	matchId: string;
	homeScore: number;
	visitingScore: number;

	constructor(match: MatchDTO) {
		this.matchId = match.matchID;
		this.homeScore = match.scoreHome;
		this.visitingScore = match.scoreVisiting;
	}
}