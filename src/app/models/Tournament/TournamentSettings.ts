import { TournamentMode } from './TournamentMode';

export class TournamentSettings {

    public static createFromJSON(jsonSetting: TournamentSettings) {
        return new TournamentSettings(
            jsonSetting.mode,
            jsonSetting.tableCount,
            jsonSetting.randomRounds,
            jsonSetting.matchesToWin,
            jsonSetting.goalsToWin,
            jsonSetting.minutesPerMatch,
            jsonSetting.pointsForWinner,
            jsonSetting.pointsForDraw,
            jsonSetting.currentNoOfMatches
        );
    }

    constructor(public mode: TournamentMode = null,
                public tableCount: number = null,
                public randomRounds: number = null,
                public matchesToWin: number = null,
                public goalsToWin: number = null,
                public minutesPerMatch: number = null,
                public pointsForWinner: number = null,
                public pointsForDraw: number = null,
                public currentNoOfMatches: number = null) {}

}
