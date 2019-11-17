import {
    Component,
    OnInit,
    ViewChild,
    AfterContentInit,
    AfterViewInit
} from '@angular/core';
import { TournamentService } from 'src/app/services/tournament.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tournament } from 'src/app/models/Tournament/Tournament';
import { MatchresulteditorComponent } from './matchresulteditor/matchresulteditor.component';
import { Match } from 'src/app/models/Matches/Match';
import { PlayerRankingRow } from 'src/app/models/Tournament/PlayerRankingRowDTO';
import { Player } from 'src/app/models/Player/Player';
import { IRefreshCallback } from 'src/app/views/tournament/IRefreshCallback';
import { RankingdetailsComponent } from './rankingdetails/rankingdetails.component';
import { PlayerStatus } from 'src/app/models/Player/PlayerStatus.enum';
import { StopwatchComponent } from './stopwatch/stopwatch.component';
import { delay } from 'q';
import { TournamentChannelCommands } from 'src/app/models/Tournament/TournamentChannelCommands';
import { BroadcastMessage } from 'src/app/models/BroadcastMessage';
declare var $: any;

@Component({
    selector: 'app-tournament',
    templateUrl: './tournament.component.html',
    styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit, IRefreshCallback {
    @ViewChild(MatchresulteditorComponent, { static: false }) matchResultEditor: MatchresulteditorComponent;
    @ViewChild(RankingdetailsComponent, { static: false }) rankingDetails: RankingdetailsComponent;
    @ViewChild(StopwatchComponent, { static: false }) stopwatch: StopwatchComponent;

    private channel = new BroadcastChannel(TournamentChannelCommands.CHANNEL_ID);

    tournament: Tournament;
    rankings: PlayerRankingRow[];
    tournamentId: string;
    currentRound: number;
    currentMatches: Match[];

    constructor(
        private activeRoute: ActivatedRoute,
        private tournamentService: TournamentService
    ) {}

    ngOnInit(): void {
        this.activeRoute.params.subscribe(params => {
            this.tournamentId = params.uuid;
            this.refreshTournament();
        });

        this.initStopwatchWhenReady();
        this.channel.onmessage = msg => this.doOnMessage(msg.data);
    }

    private doOnMessage(msg: BroadcastMessage) {
        if (msg.cmd === TournamentChannelCommands.CMD_REGISTER) {
            this.channel.postMessage(
                new BroadcastMessage(
                    TournamentChannelCommands.CMD_INIT,
                    this.tournament
                )
            );
        }
    }

    private async initStopwatchWhenReady() {
        while (true) {
            await delay(500);
            if (this.stopwatch !== undefined) {
                this.tournament.settings.minutesPerMatch = 5;
                this.stopwatch.initStopwatch(
                    this.tournament.settings.minutesPerMatch
                );
                break;
            }
        }
    }

    private refreshRankings() {
        this.tournamentService
            .getRankingForRound(this.tournamentId, this.currentRound)
            .subscribe(newRankings => this.rankings = newRankings);
    }

    private refreshTournament() {
        this.tournamentService
            .getCurrentTournament(this.tournamentId)
            .subscribe((result: Tournament) => {
                this.tournament = result;
                this.currentRound = result.currentRound;
                this.refreshRankings();
                this.refreshMatches();
            });
        }
        refreshMatches() {
            this.currentMatches = this.tournament.getMatchesForRound(
            this.currentRound
        );
    }

    onRoundSelectionChange(roundString: string) {
        const selectedRound = parseInt(roundString.split(' ')[1], 10);
        this.currentRound = selectedRound;
        this.refreshMatches();
        this.refreshRankings();
    }

    arrayOne(n: number): any[] {
        return Array(n);
    }

    onShowPlayerManagementViewClicked() {
        // TODO
    }

    onOpenTournamentShowWindowClicked() {
        window.open('/tournamentshow/' + this.tournamentId);
    }

    onStartNextRoundClicked() {
        this.tournamentService
            .startNextRound(this.tournament.uid)
            .subscribe(resultTournament => {
                this.tournament = resultTournament;
                this.currentRound = resultTournament.currentRound;
                this.refreshRankings();
                this.refreshMatches();
            });
    }

    canMatchResultEntered(): boolean {
        return (
            this.tournament.getMatchesForRound(this.currentRound)[0]
                .roundNumber !== this.tournament.currentRound
        );
    }

    onOpenEnterMatchResultDialogClicked(selectedMatch: Match) {
        this.matchResultEditor.initForMatch(
            selectedMatch,
            this.tournament,
            this
        );
    }

    onOpenRankingDetailsClicked(selectedRankingRow: PlayerRankingRow) {
        this.rankingDetails.initForRankingRow(selectedRankingRow);
    }

    doRefreshFromCallback(): void {
        this.refreshTournament();
    }

    onPlayerRemoveFromTournamentClicked(player: Player) {
        if (
            confirm(player.getFullName() + ' wirklich vom Turnier entfernen?')
        ) {
            this.tournamentService
                .removePlayerFromTournament(this.tournamentId, player)
                .subscribe(resultPlayer => {
                    this.refreshTournament();
                });
        }
    }

    onPlayerPauseClicked(player: Player) {
        this.tournamentService
            .pausePlayer(this.tournamentId, player)
            .subscribe(resultTournament => {
                this.tournament = resultTournament;
                this.refreshRankings();
            });
    }

    onPlayerResumeClicked(player: Player) {
        this.tournamentService
            .resumePlayer(this.tournamentId, player)
            .subscribe(resultTournament => {
                this.tournament = resultTournament;
                this.refreshRankings();
            });
    }

    isBtnNextRoundDisabled(): boolean {
        return (
            this.currentRound !== this.tournament.currentRound ||
            this.currentMatches.filter(eMatch => !eMatch.isMatchFinished())
                .length > 0
        );
    }
}
