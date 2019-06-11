export class TournamentSettings {
    mode: string;
    tableCount: number;
    randomRounds: number;
    matchesToWin: number;
    goalsToWin: number;
    minutesPerMatch: number;
    pointsForWinner: number;
    pointsForDraw: number;
    currentNoOfMatches: number;

    constructor() {
        this.mode = '';
        this.tableCount = undefined;
        this.randomRounds = undefined;
        this.matchesToWin = undefined;
        this.goalsToWin = undefined;
        this.minutesPerMatch = undefined;
        this.pointsForDraw = undefined;
        this.pointsForWinner = undefined;
        this.currentNoOfMatches = undefined;
    }
}
