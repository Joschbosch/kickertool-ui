import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { Player } from 'src/app/models/Player/Player';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-player-management',
    templateUrl: './player-management.component.html',
    styleUrls: ['./player-management.component.scss']
})
export class PlayerManagementComponent implements OnInit {

    @Output() closeEvent = new EventEmitter();
    players: Player[] = [];
    newPlayerForm: FormGroup;

    constructor(private playerService: PlayerService, private formBuilder: FormBuilder) {
        this.newPlayerForm = this.formBuilder.group({
            name: ''
        });
    }

    ngOnInit() {
        this.playerService.loadAllPlayers().subscribe((resp: Player[]) => this.players = resp);
    }

    onClosePlayerManagementPanel() {
        this.closeEvent.emit(null);
    }

    onCreateNewPlayerSubmit(formData: { name: string; }) {
        this.playerService.createNewPlayer(formData.name).subscribe(player => this.players.push(player));
        this.newPlayerForm.reset();
    }

    onPlayerDeleteClicked(uid: string, index: number) {
        this.playerService.deletePlayer(uid).subscribe(status => {
            if (status) {
                this.players.splice(index, 1);
            }
        });
    }
}
