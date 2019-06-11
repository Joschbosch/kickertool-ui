import { Component, OnInit, ViewChild } from '@angular/core';
import { NewtournamentComponent } from '../newtournament/newtournament.component';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.css']
})
export class MainmenuComponent implements OnInit {

    @ViewChild(NewtournamentComponent, {static: false}) newTournamentComponent: NewtournamentComponent;
     title = 'ParcIT Kickertool';

    constructor() { }

  
    ngOnInit() {
  
    }

    onOpenNewTournamentClicked(): void {
        this.newTournamentComponent.onShow();
    }
}
