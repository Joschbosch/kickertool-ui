import { MatchStatus } from './MatchStatus.enum';
import { Team } from '../Player/Team';

export class Match {
    public static createFromJSONList(jsonMatches: Match[]) {
        const matches: Match[] = [];

        for (const match of jsonMatches) {
            matches.push(Match.createFromJSON(match));
        }

        return matches;
    }

    public static createFromJSON(jsonMatch: Match) {
        return new Match(
            jsonMatch.matchID,
            jsonMatch.roundNumber,
            jsonMatch.scoreHome,
            jsonMatch.scoreVisiting,
            jsonMatch.status,
            Team.createFromJSON(jsonMatch.homeTeam),
            Team.createFromJSON(jsonMatch.visitingTeam),
            jsonMatch.gameTableDescription
        );
    }

    constructor(
        public matchID: string,
        public roundNumber: number,
        public scoreHome: number,
        public scoreVisiting: number,
        public status: MatchStatus,
        public homeTeam: Team,
        public visitingTeam: Team,
        public gameTableDescription: string
    ) {}
}
