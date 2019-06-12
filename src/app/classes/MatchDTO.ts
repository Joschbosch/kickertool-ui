import { TeamDTO } from './TeamDTO';
import { GameTableDTO } from './GameTableDTO';

export class MatchDTO {

	matchID: string;
	roundNumber: number;
	scoreHome: number;
	scoreVisiting: number;
	status: string;
	homeTeam: TeamDTO;
	visitingTeam: TeamDTO;
	table: GameTableDTO;

}
