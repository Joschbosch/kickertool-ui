import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TournamentService } from '../services/tournament.service';
import { ActivatedRoute } from '@angular/router';
import { TournamentDTO } from '../classes/TournamentDTO';
import { MatchDTO } from '../classes/MatchDTO';
import { PlayerRankingRow } from '../classes/PlayerRankingRow';
import { MatchResultDTO } from '../classes/MatchResultDTO';
import { Player } from '../classes/Player';

// tslint:disable: indent
@Component({
	selector: 'app-tournament',
	templateUrl: './tournament.component.html',
	styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

	@ViewChild('btnNewRound', { static: false }) btnNewRound: ElementRef;
	@ViewChild('modalMatchResultCloseButton', { static: false }) modalMatchResultCloseButton: ElementRef;

	myChannel = new BroadcastChannel('update');

	tournament: TournamentDTO;
	matchesForRound: MatchDTO[] = [];
	selectedMatch: MatchDTO = undefined;
	playerRankingRows: PlayerRankingRow[] = [];
	selectedRankingRow: PlayerRankingRow = undefined;
	matchResult: MatchResultDTO = undefined;

	tournamentShowMode = false;
	tournamentShowURL: string = undefined;

	constructor(private route: ActivatedRoute,
				private tournamentService: TournamentService) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.refresh(params.uuid);
		});
	}

	arrayOne(n: number): any[] {
		return Array(n);
	}

	private refresh(uuid: string): void {
		this.tournamentService.getTournament(uuid).subscribe(singleResponse => {
			this.tournament = singleResponse.dtoValue;

			if (this.tournament.status === 'FINISHED') {
				alert('Turnier ist vorbei!');
			} else {
				this.getPlayerRankings();
				this.enableDisableNextRoundBtn();
				this.refreshMatches(this.tournament.currentRound);
				this.tournamentShowURL = 'http://localhost:4200/tournamentview/' + this.tournament.uid;
			}

		});
	}

	areEditButtonsHidden(player: Player): boolean {
		return player.dummyPlayer;
	}

	isPlayerPausing(player: Player): boolean {
		return player.status === 'PAUSING_TOURNAMENT';
	}

	onPlayerRemoveFromTournamentClicked(player: Player): void {

	}

	onPlayerPauseClicked(player: Player): void {
		this.tournamentService.pausePlayer(this.tournament.uid, player.uid).subscribe(repsonse => {
			this.refresh(this.tournament.uid);
		})
	}

	onPlayerResumeClicked(player: Player): void {
		this.tournamentService.resumePlayer(this.tournament.uid, player.uid).subscribe(repsonse => {
			this.refresh(this.tournament.uid);
		})
	}

	enterMatchResultDisabled(): boolean {
		return this.matchesForRound[0].roundNumber !== this.tournament.currentRound;
	}

	private refreshMatches(round: number): void {
		this.matchesForRound = [];
		this.matchesForRound.push(...this.tournament.matches.filter((match: MatchDTO) => match.roundNumber === round));
	}

	private enableDisableNextRoundBtn(): void {
		const unfinishedMatches = this.tournament.matches.find((match: MatchDTO) => match.status !== 'FINISHED');

		if (unfinishedMatches) {
			this.btnNewRound.nativeElement.disabled = true;
		} else {
			this.btnNewRound.nativeElement.disabled = false;
		}
	}

	getPlayerRankings() {
		this.tournamentService.getPlayerRankings(this.tournament.uid, this.tournament.currentRound).subscribe(listResponse => {
			this.playerRankingRows = listResponse.dtoValueList;
		});
	}

	onNewRoundClicked(): void {
		this.btnNewRound.nativeElement.disabled = true;
		this.tournamentService.startNextRound(this.tournament.uid).subscribe(singleResponse => {
			this.tournament = singleResponse.dtoValue;
			this.refreshMatches(this.tournament.currentRound);
			this.getPlayerRankings();
		});
	}

	onEnterMatchResultClicked(match: MatchDTO): void {
		this.selectedMatch = match;
		this.matchResult = new MatchResultDTO(this.selectedMatch);
	}

	onMatchResultEnteredClicked(): void {
		this.tournamentService.enterOrChangeMatchResult(this.tournament.uid, this.matchResult).subscribe(statusOnly => {
			this.refresh(this.tournament.uid);
		});
	}

	onDetailsClicked(rankingRow: PlayerRankingRow): void {
		this.selectedRankingRow = rankingRow;
	}

	onRoundSelect(index: string): void {
		this.refreshMatches(parseInt(index.split(' ')[1], 10));
		this.myChannel.postMessage('Round ' + index);
	}

	onShowTournamentViewClicked(): void {
		this.tournamentShowMode = true;
	}
}
