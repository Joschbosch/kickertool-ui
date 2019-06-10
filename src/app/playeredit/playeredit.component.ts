import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Player } from '../classes/Player';
import { PlayerService } from '../services/player.service';
import { LoadandresponseComponent } from '../loadandresponse/loadandresponse.component';

@Component({
    selector: 'app-playeredit',
    templateUrl: './playeredit.component.html',
    styleUrls: ['./playeredit.component.css']
})
export class PlayereditComponent implements OnInit {

    @ViewChild(LoadandresponseComponent, {static: false}) loadAndResponse: LoadandresponseComponent;
    @ViewChild('newplayername', { static: false }) inputForm: ElementRef;

    players = Player[0];

    constructor(private playerService: PlayerService) { }

    addPlayer(newName: string) {

        this.loadAndResponse.showLoadingSpinner();
        const nameSplit = newName.split(' ');

        this.playerService.insertNewPlayer(nameSplit[0], nameSplit[1]).subscribe(singleResponseDTO => {
            this.players.push(singleResponseDTO.dtoValue);
            this.inputForm.nativeElement.value = '';
            this.loadAndResponse.hideLoadingSpinner();
        });

    }

    ngOnInit() {
        this.getAllPlayer();
    }

    deletePlayer(player: Player): void {
        this.loadAndResponse.showLoadingSpinner();
        const playerIndex: number = this.players.findIndex((ePlayer: Player) => ePlayer.uid === player.uid);

        this.playerService.deletePlayer(player.uid).subscribe(status => {
            if (status.dtoStatus === 'SUCCESS') {
                this.players.splice(playerIndex, 1);
            }
            this.loadAndResponse.hideLoadingSpinner();
        });

    }

    getAllPlayer(): void {
        this.playerService.getAllPlayer().subscribe(listResponseDto => {
            if (this.loadAndResponse.checkResponse(listResponseDto)) {
                this.players = listResponseDto.dtoValueList;
            }
        });
    }

}
