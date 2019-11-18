import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TournamentConfig } from 'src/app/models/Tournament/TournamentConfig';
import { TournamentconfigService } from 'src/app/services/tournamentconfig.service';
import { TournamentMode } from 'src/app/models/Tournament/TournamentMode';
import { Player } from 'src/app/models/Player/Player';
import { PlayerService } from 'src/app/services/player.service';
import { TournamentSettings } from 'src/app/models/Tournament/TournamentSettings';
import { format } from 'url';
import { TournamentService } from 'src/app/services/tournament.service';
import { Tournament } from 'src/app/models/Tournament/Tournament';
import { Router } from '@angular/router';

@Component({
    selector: 'app-tournament-configuration',
    templateUrl: './tournament-configuration.component.html',
    styleUrls: ['./tournament-configuration.component.scss']
})
export class TournamentConfigurationComponent implements OnInit {
    @Output() closeEvent = new EventEmitter();
    public defaultConfiguration: TournamentConfig;
    newTournamentConfigurationForm: FormGroup;
    public playerSelectionPage: boolean;
    public tournamentModes: TournamentMode[];
    public selectablePlayers: Player[] = [];
    public selectedPlayer: Player[] = [];

    constructor(
        private tournamentConfigService: TournamentconfigService,
        private tournamentService: TournamentService,
        private playerService: PlayerService,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
        this.newTournamentConfigurationForm = this.formBuilder.group({
            name: '',
            tableCount: [null],
            randomRounds: [null],
            matchesToWin: [null],
            goalsToWin: [null],
            minutesPerGame: [null],
            pointsForWinner: [null],
            pointsForDraw: [null],
            mode: [null]
        });
    }

    ngOnInit() {
        this.tournamentConfigService
            .loadDefaultConfiguration()
            .subscribe(
                (resp: TournamentConfig) => (this.defaultConfiguration = resp)
            );
        this.tournamentConfigService
            .loadTournamentModes()
            .subscribe(
                (resp: TournamentMode[]) => {
                    this.tournamentModes = resp;
                    this.newTournamentConfigurationForm.get('mode').setValue(this.tournamentModes[0]);
            });
        this.playerService
            .loadAllPlayers()
            .subscribe((resp: Player[]) => (this.selectablePlayers = resp));
        this.playerSelectionPage = false;
    }

    onCloseTournamentConfigurationPanel() {
        this.closeEvent.emit(null);
    }

    onCreateNewTournamentSubmit(formData: any) {
        const newTournamentConfig = this.createTournamentConfiguration(formData);
        this.tournamentService.createAndStartTournament(newTournamentConfig).subscribe((resp: Tournament) => {
            this.router.navigate(['/tournament', resp.uid]);
        });
    }

    private createTournamentConfiguration(formData: any): TournamentConfig {
        const newTournamentSettings = new TournamentSettings();

        newTournamentSettings.goalsToWin =
            formData.goalsToWin == null
                ? this.defaultConfiguration.settings.goalsToWin
                : formData.goalsToWin;

        newTournamentSettings.matchesToWin =
            formData.matchesToWin == null
                ? this.defaultConfiguration.settings.matchesToWin
                : formData.matchesToWin;

        newTournamentSettings.minutesPerMatch =
            formData.minutesPerGame == null
                ? this.defaultConfiguration.settings.minutesPerMatch
                : formData.minutesPerGame;

        newTournamentSettings.mode = formData.mode.key;

        newTournamentSettings.pointsForDraw =
            formData.pointsForDraw == null
                ? this.defaultConfiguration.settings.pointsForDraw
                : formData.pointsForDraw;

        newTournamentSettings.pointsForWinner =
            formData.pointsForWinner == null
                ? this.defaultConfiguration.settings.pointsForWinner
                : formData.pointsForWinner;

        newTournamentSettings.randomRounds =
            formData.randomRounds == null
                ? this.defaultConfiguration.settings.randomRounds
                : formData.randomRounds;

        newTournamentSettings.tableCount =
            formData.tableCount == null
                ? this.defaultConfiguration.settings.tableCount
                : formData.tableCount;

        const tournamentName = formData.name.length === 0 ? 'parcIT Turnier' : formData.name;

        const newTournamentConfig = new TournamentConfig(tournamentName, newTournamentSettings);
        this.selectedPlayer.forEach((player) => newTournamentConfig.addPlayerToSelection(player));

        return newTournamentConfig;
    }

    onMoveToPlayerSelectionPageClicked() {
        this.playerSelectionPage = true;
    }

    onMoveToPreviousPageClicked() {
        this.playerSelectionPage = false;
    }

    moveToLeft(player: Player) {
        const playerIndex: number = this.selectedPlayer.findIndex(
            (ePlayer: Player) => ePlayer.uid === player.uid
        );
        this.selectedPlayer.splice(playerIndex, 1);

        this.selectablePlayers.push(player);
    }

    moveAllToLeft() {
        this.selectablePlayers.push(...this.selectedPlayer);
        this.selectedPlayer.length = 0;
    }

    moveToRight(player: Player) {
        const playerIndex: number = this.selectablePlayers.findIndex(
            (ePlayer: Player) => ePlayer.uid === player.uid
        );
        this.selectablePlayers.splice(playerIndex, 1);

        this.selectedPlayer.push(player);
    }

    moveAllToRight() {
        this.selectedPlayer.push(...this.selectablePlayers);
        this.selectablePlayers.length = 0;
    }
}
