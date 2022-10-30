import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-mainmenu',
    templateUrl: './mainmenu.component.html',
    styleUrls: ['./mainmenu.component.scss']
})
export class MainmenuComponent implements OnInit {
    showPlayerManagement: boolean;
    newTournament: boolean;

    constructor() {}

    ngOnInit() {}

    onPlayerManagementClicked() {
        this.showPlayerManagement = true;
    }

    onClosePlayerManagementPanel() {
        this.showPlayerManagement = false;
    }

    onNewTournamentClicked() {
        this.newTournament = true;
    }

    onCloseNewTournamentPanel() {
        this.newTournament = false;
    }
}
