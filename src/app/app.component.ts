import { Component, ViewChild } from '@angular/core';
import { NewtournamentComponent } from './newtournament/newtournament.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    @ViewChild(NewtournamentComponent, {static: false}) newTournamentComponent: NewtournamentComponent;

    title = 'ParcIT Kickertool';

    onOpenNewTournamentClicked(): void {
        this.newTournamentComponent.onShow();
    }
}
