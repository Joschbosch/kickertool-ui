import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Player } from '../classes/Player';
import { PlayerService } from '../services/player.service';
import { LoadandresponseComponent } from '../loadandresponse/loadandresponse.component';
import { TournamentService } from '../services/tournament.service';


// tslint:disable: indent
@Component({
    selector: 'app-playeredit',
    templateUrl: './playeredit.component.html',
    styleUrls: ['./playeredit.component.css']
})
export class PlayereditComponent implements OnInit {

    @ViewChild(LoadandresponseComponent, {static: false}) loadAndResponse: LoadandresponseComponent;
    @ViewChild('newplayername', { static: false }) inputForm: ElementRef;
	@ViewChild('playerEditModalCloseButton', { static: false }) playerEditModalCloseButton: ElementRef;

	players = Player[0];
	tournamentMode = false;
	tournamendId: string = undefined;
	refreshTournamentChannel = new BroadcastChannel('refreshTournament');

	constructor(private playerService: PlayerService,
				private tournamentService: TournamentService) { }

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

	setTournamentMode(newTournamendId: string) {
		this.tournamentMode = true;
		this.tournamendId = newTournamendId;
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

		if (this.tournamentMode) {
			this.playerService.getAllPlayerNotInTournament(this.tournamendId).subscribe(listResponseDto => {
				this.players = listResponseDto.dtoValueList;
			});
		} else {
			this.playerService.getAllPlayer().subscribe(listResponseDto => {
				if (this.loadAndResponse.checkResponse(listResponseDto)) {
					this.players = listResponseDto.dtoValueList;
				}
			});
		}
	}

	onAddPlayerToTournamendClicked(): void {
		const selectedPlayers = this.players.filter((player: Player) => player.selectedForTournament);
		this.loadAndResponse.showLoadingSpinner();
		for (let index = 0; index < selectedPlayers.length; index++) {
			const player = selectedPlayers[index];
			this.tournamentService.addPlayer(this.tournamendId, player.uid).subscribe(response => {
				if (index === (selectedPlayers.length - 1)) {
					this.loadAndResponse.hideLoadingSpinner();
					this.getAllPlayer();
					this.playerEditModalCloseButton.nativeElement.click();
					this.refreshTournamentChannel.postMessage('');
				}
			});
		}
	}

}
