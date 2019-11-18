import { Player } from '../Player/Player';

export class PlayerRankingRow {

    public static createFromJSONArray(jsonRankingRows: PlayerRankingRow[]): PlayerRankingRow[] {

        const newPlayerRankings = [];

        for (const jsonRankingRow of jsonRankingRows) {
            newPlayerRankings.push(new PlayerRankingRow(
                Player.createFromJSON(jsonRankingRow.player),
                jsonRankingRow.rank,
                jsonRankingRow.matchesPlayed,
                jsonRankingRow.matchesWon,
                jsonRankingRow.matchesLost,
                jsonRankingRow.matchesDraw,
                jsonRankingRow.goals,
                jsonRankingRow.concededGoals,
                jsonRankingRow.goaldiff,
                jsonRankingRow.score
            ));
        }

        return newPlayerRankings;
    }

    public static createFromJSON(jsonRankingRow: PlayerRankingRow): PlayerRankingRow {
        return new PlayerRankingRow(
            Player.createFromJSON(jsonRankingRow.player),
            jsonRankingRow.rank,
            jsonRankingRow.matchesPlayed,
            jsonRankingRow.matchesWon,
            jsonRankingRow.matchesLost,
            jsonRankingRow.matchesDraw,
            jsonRankingRow.goals,
            jsonRankingRow.concededGoals,
            jsonRankingRow.goaldiff,
            jsonRankingRow.score
        );
    }

    public constructor(
        public player: Player,
        public rank: number,
        public matchesPlayed: number,
        public matchesWon: number,
        public matchesLost: number,
        public matchesDraw: number,
        public goals: number,
        public concededGoals: number,
        public goaldiff: number,
        public score: number
    ) {}
}
