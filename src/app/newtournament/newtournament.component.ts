import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TournamentconfigurationService } from '../services/tournamentconfiguration.service';
import { TournamentConfigurationDTO } from '../classes/TournamentConfigurationDTO';
import { Player } from '../classes/Player';
import { PlayerService } from '../services/player.service';
import { TournamentModeDTO } from '../classes/TournamentModeDTO';
import { TournamentSettings } from '../classes/TournamentSettings';
import { TournamentService } from '../services/tournament.service';
import { LoadandresponseComponent } from '../loadandresponse/loadandresponse.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newtournament',
  templateUrl: './newtournament.component.html',
  styleUrls: ['./newtournament.component.css']
})
export class NewtournamentComponent implements OnInit {

    @ViewChild(LoadandresponseComponent, {static: false}) loadAndResponse: LoadandresponseComponent;
    @ViewChild('modalCloseButton', {static: false}) modalCloseButton: ElementRef;

    currentConfig: TournamentConfigurationDTO = {
        name: '',
        settings: new TournamentSettings(),
        selectedPlayer: []
    };

    defaultConfig: TournamentConfigurationDTO = undefined;
    selectablePlayers: Player[] = [];
    selectedPlayer: Player[] = [];
    playerSelectionPage = false;
    tournamentModes: TournamentModeDTO[] = [];

    constructor(private router: Router,
                private tournamentConfigurationService: TournamentconfigurationService,
                private playerService: PlayerService,
                private tournamentService: TournamentService) { }

    ngOnInit() { }

    onShow(): void {
        console.log('On Show');
        this.tournamentConfigurationService.getDefaultConfig().subscribe(singleResponse => {
            this.defaultConfig = singleResponse.dtoValue;
        });

        this.playerService.getAllPlayer().subscribe(listResponse => {
            this.selectablePlayers = Object.assign([], listResponse.dtoValueList);
        });

        this.tournamentConfigurationService.getTournamentModes().subscribe(listResponse => {
            this.tournamentModes = listResponse.dtoValueList;
            this.currentConfig.settings.mode = this.tournamentModes[0].key;
        });
    }

    arrayOne(n: number): any[] {
        return Array(n);
    }

    showPlayerSelectionPage(): void {
        this.playerSelectionPage = true;
    }

    showTournamentSettingsPage(): void {
        this.playerSelectionPage = false;
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

    onSubmit() {
        this.completeConfig();
        this.currentConfig.selectedPlayer.push(...this.selectedPlayer);
        this.loadAndResponse.showLoadingSpinner();
        this.tournamentService.createNewTournament(this.currentConfig).subscribe(singleResponse => {
            this.loadAndResponse.hideLoadingSpinner();
            this.modalCloseButton.nativeElement.click();
            this.router.navigate(['/tournamentview', singleResponse.dtoValue.uid]);
        });
    }

    private completeConfig(): void {

        if (this.currentConfig.settings.currentNoOfMatches === undefined) {
            this.currentConfig.settings.currentNoOfMatches = this.defaultConfig.settings.currentNoOfMatches;
        }

        if (this.currentConfig.settings.goalsToWin === undefined) {
            this.currentConfig.settings.goalsToWin = this.defaultConfig.settings.goalsToWin;
        }

        if (this.currentConfig.settings.matchesToWin === undefined) {
            this.currentConfig.settings.matchesToWin = this.defaultConfig.settings.matchesToWin;
        }

        if (this.currentConfig.settings.minutesPerMatch === undefined) {
            this.currentConfig.settings.minutesPerMatch = this.defaultConfig.settings.minutesPerMatch;
        }

        if (this.currentConfig.settings.pointsForDraw === undefined) {
            this.currentConfig.settings.pointsForDraw = this.defaultConfig.settings.pointsForDraw;
        }

        if (this.currentConfig.settings.pointsForWinner === undefined) {
            this.currentConfig.settings.pointsForWinner = this.defaultConfig.settings.pointsForWinner;
        }

        if (this.currentConfig.settings.randomRounds === undefined) {
            this.currentConfig.settings.randomRounds = this.defaultConfig.settings.randomRounds;
        }

        if (this.currentConfig.settings.tableCount === undefined) {
            this.currentConfig.settings.tableCount = this.defaultConfig.settings.tableCount;
        }
    }

}
