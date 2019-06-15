import { Component, OnInit, NgZone } from '@angular/core';
import { TournamentDTO } from '../classes/TournamentDTO';

@Component({
  selector: 'app-tournamentshow',
  templateUrl: './tournamentshow.component.html',
  styleUrls: ['./tournamentshow.component.css']
})
export class TournamentshowComponent implements OnInit {

	myChannel = new BroadcastChannel('update');
	roundName: string = '';

	constructor(private zone: NgZone) {
		this.roundName = 'Lets see';
		this.myChannel.onmessage = msg => this.updateRoundName(msg.data);
	}

	updateRoundName(msg: string) {
		this.zone.run(() => this.roundName = msg);
	}

	ngOnInit() { }

}
