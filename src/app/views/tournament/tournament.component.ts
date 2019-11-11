import { Component, OnInit } from '@angular/core';
import { TournamentService } from 'src/app/services/tournament.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tournament } from 'src/app/models/Tournament/Tournament';

@Component({
    selector: 'app-tournament',
    templateUrl: './tournament.component.html',
    styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {

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

}
