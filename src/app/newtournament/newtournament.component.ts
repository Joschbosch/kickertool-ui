import { Component, OnInit } from '@angular/core';
import { TournamentconfigurationService } from '../services/tournamentconfiguration.service';
import { TournamentConfiguration } from '../classes/TournamentConfiguration';
import { Player } from '../classes/Player';
import { PlayerService } from '../services/player.service';
import { concat } from 'rxjs';

@Component({
  selector: 'app-newtournament',
  templateUrl: './newtournament.component.html',
  styleUrls: ['./newtournament.component.css']
})
export class NewtournamentComponent implements OnInit {

    defaultConfig: TournamentConfiguration = undefined;
    selectablePlayers: Player[] = [];
    selectedPlayer: Player[] = [];

    constructor(private tournamentConfigurationService: TournamentconfigurationService, private playerService: PlayerService) { }

    ngOnInit() {
        this.tournamentConfigurationService.getDefaultConfig().subscribe(singleResponse => {
            this.defaultConfig = singleResponse.dtoValue;
        });

        this.playerService.getAllPlayer().subscribe(listResponse => {
            this.selectablePlayers = Object.assign([], listResponse.dtoValueList);
        });
    }

    arrayOne(n: number): any[] {
        return Array(n);
    }

    moveAllToRight() {
        this.selectedPlayer.push(...this.selectablePlayers);
        this.selectablePlayers.length = 0;
    }

    moveToRight(player: Player) {
        const playerIndex: number = this.selectablePlayers.findIndex((ePlayer: Player) => ePlayer.uid === player.uid);
        this.selectablePlayers.splice(playerIndex, 1);

        this.selectedPlayer.push(player);
    }

    moveAllToLeft() {
        this.selectablePlayers.push(...this.selectedPlayer);
        this.selectedPlayer.length = 0;
    }

    moveToLeft(player: Player) {
        const playerIndex: number = this.selectedPlayer.findIndex((ePlayer: Player) => ePlayer.uid === player.uid);
        this.selectedPlayer.splice(playerIndex, 1);

        this.selectablePlayers.push(player);
    }

}
