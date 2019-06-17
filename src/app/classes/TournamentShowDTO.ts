import { TournamentDTO } from './TournamentDTO';
import { MatchDTO } from './MatchDTO';
import { PlayerRankingRow } from './PlayerRankingRow';

export class TournamentShowDTO {
	tournament: TournamentDTO;
	matches: MatchDTO[];
	rankings: PlayerRankingRow[];
}
