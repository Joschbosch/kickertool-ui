import { Player } from './Player';

export class PlayerRankingRow {
  player: Player;
  rank: number;
  matchesPlayed: number;
  matchesWon: number;
  matchesLost: number;
  matchesDraw: number;
  goals: number;
  concededGoals: number;
  goaldiff: number;
  score: number;
}
