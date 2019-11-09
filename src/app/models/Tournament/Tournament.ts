import { TournamentStatus } from './TournamentStatus.enum';
import { TournamentSettings } from './TournamentSettings';
import { Match } from '../Matches/Match';
import { GameTable } from '../Matches/GameTable';

export class Tournament {

    public static createFromJSON(jsonTournament: Tournament) {
        return new Tournament(
            jsonTournament.uid,
            jsonTournament.name,
            jsonTournament.status,
            TournamentSettings.createFromJSON(jsonTournament.settings),
            Match.createFromJSONList(jsonTournament.matches),
            GameTable.createFromJSONList(jsonTournament.playtables),
            jsonTournament.currentRound
        );
    }

    public constructor(
        public uid: string,
        public name: string,
        public status: TournamentStatus,
        public settings: TournamentSettings,
        public matches: any,
        public playtables: any,
        public currentRound: number
    ) {}

}
