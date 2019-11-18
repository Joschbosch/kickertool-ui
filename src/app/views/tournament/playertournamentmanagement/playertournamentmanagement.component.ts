import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/Player/Player';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PlayerService } from 'src/app/services/player.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { IRefreshCallback } from '../IRefreshCallback';

@Component({
    selector: 'app-playertournamentmanagement',
    templateUrl: './playertournamentmanagement.component.html',
    styleUrls: ['./playertournamentmanagement.component.scss']
})
export class PlayertournamentManagementComponent implements OnInit {
    players: Player[] = [];
    newPlayerForm: FormGroup;
    tournamentId: string;
    cb: IRefreshCallback;

    constructor(
        private playerService: PlayerService,
        private tournamentService: TournamentService,
        private formBuilder: FormBuilder
    ) {
        this.newPlayerForm = this.formBuilder.group({
            name: ''
        });
    }

    ngOnInit() {}

    init(tournamentId: string, cb: IRefreshCallback) {
        this.tournamentId = tournamentId;
        this.cb = cb;
        this.refreshPlayerList();
    }
    refreshPlayerList() {
        this.playerService
            .loadAllPlayersNotInTournament(this.tournamentId)
            .subscribe(result => (this.players = result));
    }

    onPlayerAddToTournamentClicked(player: Player) {
        this.tournamentService
            .addPlayerToTournament(this.tournamentId, player)
            .subscribe(resul => {
                this.cb.doRefreshFromCallback();
                this.refreshPlayerList();
            });
    }

    onCreateNewPlayerSubmit(formData: { name: string }) {
        this.playerService
            .createNewPlayer(formData.name)
            .subscribe(player => this.players.push(player));
        this.newPlayerForm.reset();
    }
}
