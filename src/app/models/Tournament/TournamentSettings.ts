import { TournamentMode } from './TournamentMode';

export class TournamentSettings {

    mode: TournamentMode;
    tableCount: number;
    randomRounds: number;
    matchesToWin: number;
    goalsToWin: number;
    minutesPerMatch: number;
    pointsForWinner: number;
    pointsForDraw: number;

    public static createFromJSON(jsonSetting: TournamentSettings) {
        var newTournament = new TournamentSettings();
    
        newTournament.mode = jsonSetting.mode;
        newTournament.tableCount = jsonSetting.tableCount;
        newTournament.randomRounds = jsonSetting.randomRounds;
        newTournament.matchesToWin = jsonSetting.matchesToWin;
        newTournament.goalsToWin = jsonSetting.goalsToWin;
        newTournament.minutesPerMatch = jsonSetting.minutesPerMatch;
        newTournament.pointsForWinner = jsonSetting.pointsForWinner;
        newTournament.pointsForDraw = jsonSetting.pointsForDraw;

        return newTournament;
    }

}
