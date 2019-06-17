import { Component, OnInit, NgZone } from '@angular/core';
import { TournamentDTO } from '../classes/TournamentDTO';
import { TournamentShowDTO } from '../classes/TournamentShowDTO';

// tslint:disable: indent
@Component({
  selector: 'app-tournamentshow',
  templateUrl: './tournamentshow.component.html',
  styleUrls: ['./tournamentshow.component.css']
})
export class TournamentshowComponent implements OnInit {

	tournamentShowChannel = new BroadcastChannel('tournamentShow');
	tournamentShowDTO: TournamentShowDTO = undefined;

	constructor(private zone: NgZone) {
		this.tournamentShowChannel.onmessage = msg => this.updateTournamentShowView(msg.data);
	}

	updateTournamentShowView(tournamentShowDTO: TournamentShowDTO) {
		this.zone.run(() => this.tournamentShowDTO = tournamentShowDTO);
	}

	ngOnInit() { }

}
