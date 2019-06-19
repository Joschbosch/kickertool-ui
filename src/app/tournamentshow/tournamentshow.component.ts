import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { TournamentShowDTO } from '../classes/TournamentShowDTO';
import { PlayerRankingRow } from '../classes/PlayerRankingRow';
import * as FireworksCanvas from 'fireworks-canvas'
import { delay } from 'q';

// tslint:disable: indent
@Component({
  selector: 'app-tournamentshow',
  templateUrl: './tournamentshow.component.html',
  styleUrls: ['./tournamentshow.component.css']
})
export class TournamentshowComponent implements OnInit {


	@ViewChild('fireworks', {static: true}) fireworks: ElementRef;
	// fireworks = new FireworksCanvas(this.container);
	tournamentShowChannel = new BroadcastChannel('tournamentShow');
	tournamentShowWinModal = new BroadcastChannel('tournamentShowWinModal');
	tournamentShowDTO: TournamentShowDTO = undefined;
	trophieURLS = ['./../../assets/images/Golden_Trophy.jpg',
					'./../../assets/images/Silver_Trophy.jpg',
					'./../../assets/images/Bronze_Trophy.jpg'];

	displayWinModal = 'none';
	topThree: PlayerRankingRow[] = undefined;

	constructor(private zone: NgZone) {
		this.tournamentShowChannel.onmessage = msg => this.updateTournamentShowView(msg.data);
		this.tournamentShowWinModal.onmessage = msg => this.showWinModal();
	}

	private updateTournamentShowView(tournamentShowDTO: TournamentShowDTO) {
		this.zone.run(() => {
			this.tournamentShowDTO = tournamentShowDTO;
			this.topThree = this.getTopThree();
		});
	}

	private showWinModal() {
		this.zone.run(() => {
			this.displayWinModal = 'block';
			this.showFireworks();
		});
	}

	private async showFireworks() {

		await delay(500);

		const options: FireworksCanvas.FireworksOptions = {
			maxRockets: 20,
			explosionChance: 0.04,
			numParticles: 50,
			rocketSpawnInterval: 100,
			explosionMinHeight: 0.2,
			explosionMaxHeight: 0.9
		};
		const fireworks = new FireworksCanvas(this.fireworks.nativeElement, options);
		fireworks.start();
	}

	ngOnInit() { }

	getTrophyURL(rank: number): string {
		return this.trophieURLS[rank - 1];
	}

	getTopThree(): PlayerRankingRow[] {
		return this.tournamentShowDTO.rankings.filter((ranking: PlayerRankingRow) => ranking.rank <= 3);
	}

}
