import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Match } from 'src/app/models/Matches/Match';
import { Tournament } from 'src/app/models/Tournament/Tournament';
import { MatchResult } from 'src/app/models/Matches/MatchResult';
import { FormBuilder, FormGroup } from '@angular/forms';
import { log } from 'util';
import { TournamentService } from 'src/app/services/tournament.service';
import { IRefreshCallback } from 'src/app/views/tournament/IRefreshCallback';

@Component({
    selector: 'app-matchresulteditor',
    templateUrl: './matchresulteditor.component.html',
    styleUrls: ['./matchresulteditor.component.scss']
})
export class MatchresulteditorComponent implements OnInit {
    @ViewChild('closeButton', { static: false }) closeButton: ElementRef;

    selectedMatch: Match;
    currentTournament: Tournament;
    matchResultForm: FormGroup;
    cb: IRefreshCallback;

    constructor(
        private formBuilder: FormBuilder,
        private tournamentService: TournamentService
    ) {
        this.matchResultForm = this.formBuilder.group({
            scoreHome: [],
            scoreVisiting: []
        });
    }

    ngOnInit() {}

    initForMatch(newMatch: Match, tournament: Tournament, cb: IRefreshCallback) {
        this.selectedMatch = newMatch;
        this.currentTournament = tournament;
        this.cb = cb;
        this.matchResultForm.get('scoreHome').setValue(newMatch.scoreHome);
        this.matchResultForm
            .get('scoreVisiting')
            .setValue(newMatch.scoreVisiting);
    }

    onSubmitMatchResult(formData: any) {
        const newMatchResult = new MatchResult(
            this.selectedMatch.matchID,
            formData.scoreHome,
            formData.scoreVisiting);

        this.tournamentService
            .enterOrChangeMatchResult(
                this.currentTournament.uid,
                newMatchResult
            ).subscribe(() => {
                // tslint:disable-next-line: max-line-length
                console.log('Match zu Id: ' + this.selectedMatch.matchID + ' eingetragen. Mit Ergebnis: ' + formData.scoreHome + ':' + formData.scoreVisiting);
                this.cb.doRefreshFromOutside();
                this.closeButton.nativeElement.click();
            });
    }
}
