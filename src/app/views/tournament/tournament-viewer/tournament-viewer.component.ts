import { Component, OnInit, NgZone } from '@angular/core';
import { TournamentChannelCommands } from 'src/app/models/Tournament/TournamentChannelCommands';
import { BroadcastMessage } from 'src/app/models/BroadcastMessage';
import { Tournament } from 'src/app/models/Tournament/Tournament';
import { Match } from 'src/app/models/Matches/Match';

@Component({
    selector: 'app-tournament-viewer',
    templateUrl: './tournament-viewer.component.html',
    styleUrls: ['./tournament-viewer.component.scss']
})
export class TournamentViewerComponent implements OnInit {
    private channel = new BroadcastChannel(TournamentChannelCommands.CHANNEL_ID);
    tournament: Tournament;
    currentMatches: Match[];

    showMatchesWithStopwatch = false;
    showRankingsOnly = false;

    constructor(private zone: NgZone) {}

    ngOnInit() {
        this.channel.onmessage = msg => this.doOnMessage(msg.data);
        this.channel.postMessage(
            new BroadcastMessage(TournamentChannelCommands.CMD_REGISTER)
        );
    }

    private doOnMessage(msg: BroadcastMessage) {
        if (msg.cmd === TournamentChannelCommands.CMD_INIT) {
            this.zone.run(() => {
              this.tournament = Tournament.createFromJSON(msg.data);
              this.currentMatches = this.tournament.getMatchesForRound(this.tournament.currentRound);
              this.setShowMatchesWithStopwatch();
            });
        }

        if (msg.cmd === TournamentChannelCommands.CMD_SHOW_MATCHES_WITH_STOPWATCH) {
          this.zone.run(() => this.setShowMatchesWithStopwatch());
        }

        if (msg.cmd === TournamentChannelCommands.CMD_SHOW_RANKINGS_ONLY) {
          this.zone.run(() => this.setShowRankingsOnly());
        }
    }

    private setShowMatchesWithStopwatch() {
      this.showMatchesWithStopwatch = true;
      this.showRankingsOnly = false;
    }

    private setShowRankingsOnly() {
      this.showMatchesWithStopwatch = false;
      this.showRankingsOnly = true;
    }
}
