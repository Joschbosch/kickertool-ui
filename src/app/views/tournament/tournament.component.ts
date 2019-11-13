import { Component, OnInit, ViewChild } from '@angular/core';
import { TournamentService } from 'src/app/services/tournament.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tournament } from 'src/app/models/Tournament/Tournament';
import { MatchresulteditorComponent } from './matchresulteditor/matchresulteditor.component';
import { Match } from 'src/app/models/Matches/Match';
import { PlayerRankingRow } from 'src/app/models/Tournament/PlayerRankingRowDTO';
import { Player } from 'src/app/models/Player/Player';
import { IRefreshCallback } from 'src/app/views/tournament/IRefreshCallback';
import { RankingdetailsComponent } from './rankingdetails/rankingdetails.component';
declare var $: any;

@Component({
    selector: 'app-tournament',
    templateUrl: './tournament.component.html',
    styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit, IRefreshCallback {

    @ViewChild(MatchresulteditorComponent, { static: false }) matchResultEditor: MatchresulteditorComponent;
    @ViewChild(RankingdetailsComponent, {static: false}) rankingDetails: RankingdetailsComponent;

    tournament: Tournament;
    rankings: PlayerRankingRow[];
    tournamentId: string;

    constructor(
        private activeRoute: ActivatedRoute,
        private router: Router,
        private tournamentService: TournamentService
    ) {}

    ngOnInit() {
        this.activeRoute.params.subscribe(params => {
            this.tournamentId = params.uuid;
            this.refresh();
        });
    }

    private refresh() {
        this.tournamentService
            .getCurrentTournament(this.tournamentId)
            .subscribe((result: Tournament) => {
                this.tournament = result;
                this.tournamentService
                    .getRankingForRound(
                        this.tournamentId,
                        result.currentRound
                    ).subscribe(newRankings => (this.rankings = newRankings));
            });
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
            .subscribe(result => this.refresh());
    }

    canMatchResultEntered(): boolean {
        return (
            this.tournament.getMatchesForRound(this.tournament.currentRound)[0]
                .roundNumber !== this.tournament.currentRound
        );
    }

    onOpenEnterMatchResultDialogClicked(selectedMatch: Match) {
        this.matchResultEditor.initForMatch(selectedMatch, this.tournament, this);
    }

    onOpenRankingDetailsClicked(selectedRankingRow: PlayerRankingRow) {
        this.rankingDetails.initForRankingRow(selectedRankingRow);
    }

    doRefreshFromOutside(): void {
        this.refresh();
    }

    onPlayerRemoveFromTournamentClicked(player: Player) {}

    onPlayerPauseClicked(player: Player) {}

    onPlayerResumeClicked(player: Player) {}
}
