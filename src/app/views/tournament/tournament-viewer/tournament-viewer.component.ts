import { Component, OnInit, NgZone } from '@angular/core';
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
    private channel = new BroadcastChannel(TournamentChannelCommands.CHANNEL_ID);
    tournament: Tournament;
    currentMatches: Match[];
    rankings: PlayerRankingRow[];

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

    }
    setTournament(tournamentJson: Tournament) {
        this.tournament = Tournament.createFromJSON(tournamentJson);
        this.currentMatches = this.tournament.getMatchesForRound(this.tournament.currentRound);
    }

}
