import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../services/tournament.service';
import { ActivatedRoute } from '@angular/router';
import { TournamentDTO } from '../classes/TournamentDTO';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

    tournament: TournamentDTO;

    constructor(private route: ActivatedRoute,
                private tournamentService: TournamentService) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.tournamentService.getTournament(params.uuid).subscribe(singleResponse => {
				this.tournament = singleResponse.dtoValue;
			});
        });
    }

    onNewRoundClicked(): void {
        this.tournamentService.startNextRound(this.tournament.uid).subscribe(singleResponse => {
			console.log('Came back');
		});
    }

}
