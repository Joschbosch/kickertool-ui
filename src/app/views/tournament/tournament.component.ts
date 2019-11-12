import { Component, OnInit, ViewChild } from '@angular/core';
import { TournamentService } from 'src/app/services/tournament.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tournament } from 'src/app/models/Tournament/Tournament';
import { MatchresulteditorComponent } from './matchresulteditor/matchresulteditor.component';
import { Match } from 'src/app/models/Matches/Match';
declare var $: any;

@Component({
    selector: 'app-tournament',
    templateUrl: './tournament.component.html',
    styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {

    @ViewChild(MatchresulteditorComponent, {static: false}) matchResultEditor: MatchresulteditorComponent;

    tournament: Tournament;

    constructor(private activeRoute: ActivatedRoute,
                private router: Router,
                private tournamentService: TournamentService) { }

    ngOnInit() {
        this.activeRoute.params.subscribe(params => {
            this.tournamentService.getCurrentTournament(params.uuid).subscribe((result: Tournament) => this.tournament = result);
        });
    }

    onShowPlayerManagementViewClicked() {
        // TODO
    }

    onOpenTournamentShowWindowClicked() {
        window.open('/tournamentshow');
    }

    onStartNextRoundClicked() {
        this.tournamentService.startNextRound(this.tournament.uid).subscribe(result => this.tournament = result);
    }

    canMatchResultEntered(): boolean {
        return this.tournament.getMatchesForRound(this.tournament.currentRound)[0].roundNumber !== this.tournament.currentRound;
    }

    onOpenEnterMatchResultDialogClicked(selectedMatch: Match) {
        this.matchResultEditor.initForMatch(selectedMatch, this.tournament);

    }
}
