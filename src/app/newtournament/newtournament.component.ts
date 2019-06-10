import { Component, OnInit } from '@angular/core';
import { TournamentconfigurationService } from '../services/tournamentconfiguration.service';
import { TournamentConfiguration } from '../classes/TournamentConfiguration';

@Component({
  selector: 'app-newtournament',
  templateUrl: './newtournament.component.html',
  styleUrls: ['./newtournament.component.css']
})
export class NewtournamentComponent implements OnInit {

    defaultConfig: TournamentConfiguration = undefined;

    constructor(private tournamentConfigurationService: TournamentconfigurationService) { }

    ngOnInit() {
        this.tournamentConfigurationService.getDefaultConfig().subscribe(singleResponse => {
            this.defaultConfig = singleResponse.dtoValue;
        });
    }

    arrayOne(n: number): any[] {
        return Array(n);
    }

}
