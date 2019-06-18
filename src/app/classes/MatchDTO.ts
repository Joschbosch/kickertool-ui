import { TeamDTO } from './TeamDTO';

export class MatchDTO {

	matchID: string;
	roundNumber: number;
	scoreHome: number;
	scoreVisiting: number;
	status: string;
	homeTeam: TeamDTO;
	visitingTeam: TeamDTO;
	gameTableDescription: string;

}
