import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Player } from '../classes/Player';
import { PlayerService } from '../services/player.service';

@Component({
    selector: 'app-playeredit',
    templateUrl: './playeredit.component.html',
    styleUrls: ['./playeredit.component.css']
})
export class PlayereditComponent implements OnInit {

    @ViewChild('newplayername', { static: false }) inputForm: ElementRef;
    @ViewChild('loadingSpinner', {static: false}) loadingSpinner: ElementRef;

    players = Player[0];

    constructor(private playerService: PlayerService) { }

    addPlayer(newName: string) {

        this.showLoadingSpinner();
        const nameSplit = newName.split(' ');

        this.playerService.insertNewPlayer(nameSplit[0], nameSplit[1]).subscribe(singleResponseDTO => {
            this.players.push(singleResponseDTO.dtoValue);
            this.inputForm.nativeElement.value = '';
            this.hideLoadingSpinner();
        });

    }

    showLoadingSpinner(): void {
        this.loadingSpinner.nativeElement.style.display = 'inline-block';
    }

    hideLoadingSpinner(): void {
        this.loadingSpinner.nativeElement.style.display = 'none';
    }

    ngOnInit() {
        this.getAllPlayer();
    }

    deletePlayer(player: Player): void {
        this.showLoadingSpinner();
        const playerIndex: number = this.players.findIndex(x => x.uid == player.uid);

        this.playerService.deletePlayer(player.uid).subscribe(status => {
            if (status.dtoStatus === 'SUCCESS') {
                this.players.splice(playerIndex, 1);
            }
            this.hideLoadingSpinner();
        });

    }

    getAllPlayer(): void {
        this.playerService.getAllPlayer().subscribe(listResponseDto => {
            this.players = listResponseDto.dtoValueList;
        });
    }

}
