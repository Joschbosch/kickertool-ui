import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { TournamentChannelCommands } from 'src/app/models/Tournament/TournamentChannelCommands';
import { BroadcastMessage } from 'src/app/models/BroadcastMessage';
import { Tournament } from 'src/app/models/Tournament/Tournament';
import { Match } from 'src/app/models/Matches/Match';
import { PlayerRankingRow } from 'src/app/models/Tournament/PlayerRankingRowDTO';

@Component({
    selector: 'app-tournament-viewer',
    templateUrl: './tournament-viewer.component.html',
    styleUrls: ['./tournament-viewer.component.scss']
})
export class TournamentViewerComponent implements OnInit {

    @ViewChild('showTrophy', {static: true}) btnShowTrophy: ElementRef;

    private channel = new BroadcastChannel(TournamentChannelCommands.CHANNEL_ID);
    tournament: Tournament;
    currentMatches: Match[];
    rankings: PlayerRankingRow[];

    trophieURLS = ['./../../../../assets/images/trophy_gold.jpg',
                    './../../../../assets/images/trophy_silver.jpg',
                    './../../../../assets/images/trophy_gold.jpg'];

    constructor(private zone: NgZone) {}

    ngOnInit() {
        this.channel.onmessage = msg => this.doOnMessage(msg.data);
        this.channel.postMessage(
            new BroadcastMessage(TournamentChannelCommands.CMD_REGISTER)
        );
    }

    private doOnMessage(msg: BroadcastMessage) {
        if (msg.cmd === TournamentChannelCommands.CMD_UPDATE_TOURNAMENT) {
            this.zone.run(() => {
                this.setTournament(msg.data);
            });
        }

        if (msg.cmd === TournamentChannelCommands.CMD_UPDATE_RANKINGS) {
            console.log( msg.data);
            this.zone.run(() => this.rankings = PlayerRankingRow.createFromJSONArray(msg.data));
        }

        if (msg.cmd === TournamentChannelCommands.CMD_FINISH_TOURNAMENT) {
            this.btnShowTrophy.nativeElement.click();
        }

    }
    setTournament(tournamentJson: Tournament) {
        this.tournament = Tournament.createFromJSON(tournamentJson);
        this.currentMatches = this.tournament.getMatchesForRound(this.tournament.currentRound);
    }

    getTrophyURL(rank: number): string {
        return this.trophieURLS[rank - 1];
    }

    getTopThree(): PlayerRankingRow[] {
        return this.rankings.filter((ranking: PlayerRankingRow) => ranking.rank <= 3);
    }

}
