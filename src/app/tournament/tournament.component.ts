import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { TournamentService } from '../services/tournament.service';
import { ActivatedRoute } from '@angular/router';
import { TournamentDTO } from '../classes/TournamentDTO';
import { MatchDTO } from '../classes/MatchDTO';
import { PlayerRankingRow } from '../classes/PlayerRankingRow';
import { MatchResultDTO } from '../classes/MatchResultDTO';
import { Player } from '../classes/Player';
import { PlayereditComponent } from '../playeredit/playeredit.component';
import { StopwatchComponent } from '../stopwatch/stopwatch.component';
import { TournamentShowDTO } from '../classes/TournamentShowDTO';
import { delay } from 'q';

// tslint:disable: indent
@Component({
	selector: 'app-tournament',
	templateUrl: './tournament.component.html',
	styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

	@ViewChild('btnNewRound', { static: false }) btnNewRound: ElementRef;
	@ViewChild(PlayereditComponent, {static: false}) playerEditComponent: PlayereditComponent;
	@ViewChild(StopwatchComponent, {static: false}) stopWatchComponent: StopwatchComponent;

	tournamentShowChannel = new BroadcastChannel('tournamentShow');
	tournamentShowWinModal = new BroadcastChannel('tournamentShowWinModal');
	refreshTournamentChannel = new BroadcastChannel('refreshTournament');
	stopwatchChannel = new BroadcastChannel('stopwatch');

	tournament: TournamentDTO;
	matchesForRound: MatchDTO[] = [];
	selectedMatch: MatchDTO = undefined;
	playerRankingRows: PlayerRankingRow[] = [];
	selectedRankingRow: PlayerRankingRow = undefined;
	matchResult: MatchResultDTO = undefined;

	tournamentShowMode = false;
	tournamentShowURL: string = undefined;

	constructor(private zone: NgZone,
				         private route: ActivatedRoute,
				         private tournamentService: TournamentService) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.refresh(params.uuid);
		});
		this.refreshTournamentChannel.onmessage = () => this.refresh(this.tournament.uid);
	}

	arrayOne(n: number): any[] {
		return Array(n);
	}

	private refresh(uuid: string): void {

		this.zone.run(() =>
			this.tournamentService.getTournament(uuid).subscribe(singleResponse => {
				this.tournament = singleResponse.dtoValue;
				this.stopwatchChannel.postMessage(this.tournament.settings.minutesPerMatch);
				this.refreshMatches(this.tournament.currentRound);
				this.enableDisableNextRoundBtn();
				this.tournamentShowURL = 'http://localhost:4200/tournamentview/' + this.tournament.uid;
				this.getPlayerRankings();
		}));
	}

	private broadcastTournamentShow(): void {

		const matches = this.getMatchesForRound(this.tournament.currentRound);

		const tournamentShowDTO: TournamentShowDTO = {
			tournament: this.tournament,
			matches,
			rankings: this.playerRankingRows
		};

		this.tournamentShowChannel.postMessage(tournamentShowDTO);
	}

	areEditButtonsHidden(player: Player): boolean {
		return player.dummyPlayer;
	}

	isPlayerPausing(player: Player): boolean {
		return player.status === 'PAUSING_TOURNAMENT';
	}

	onPlayerRemoveFromTournamentClicked(player: Player): void {
		this.tournamentService.removePlayerFromTournament(this.tournament.uid, player.uid).subscribe(() => {
			this.refresh(this.tournament.uid);
		});
	}

	onPlayerPauseClicked(player: Player): void {
		this.tournamentService.pausePlayer(this.tournament.uid, player.uid).subscribe(() => {
			this.refresh(this.tournament.uid);
		});
	}

	onPlayerResumeClicked(player: Player): void {
		this.tournamentService.resumePlayer(this.tournament.uid, player.uid).subscribe(() => {
			this.refresh(this.tournament.uid);
		});
	}

	enterMatchResultDisabled(): boolean {
		return this.matchesForRound[0].roundNumber !== this.tournament.currentRound;
	}

	private refreshMatches(round: number): void {
		this.matchesForRound = [];
		this.matchesForRound.push(...this.getMatchesForRound(round));

	}

	private getMatchesForRound(round: number): MatchDTO[] {
		return this.tournament.matches.filter((match: MatchDTO) => match.roundNumber === round);
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
			this.broadcastTournamentShow();
		});
	}

	onFinishTournamentClicked() {

		if (confirm('Turnier wirklich beenden?')) {
			this.tournamentShowWinModal.postMessage('');
		}

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
		this.tournamentService.enterOrChangeMatchResult(this.tournament.uid, this.matchResult).subscribe(() => {
			this.refresh(this.tournament.uid);
		});
	}

	onDetailsClicked(rankingRow: PlayerRankingRow): void {
		this.selectedRankingRow = rankingRow;
	}

	onRoundSelect(index: string): void {
		this.refreshMatches(parseInt(index.split(' ')[1], 10));
	}

	onShowTournamentViewClicked(): void {
		this.tournamentShowMode = true;
		this.refreshAfterTournamentViewClicked();
	}

	private async refreshAfterTournamentViewClicked() {
		await delay(500);
		this.refresh(this.tournament.uid);
	}

	onOpenPlayerEditClicked(): void {
		this.playerEditComponent.setTournamentMode(this.tournament.uid);
	}

	onStartStopwatchClicked(): void {
		this.stopwatchChannel.postMessage('start');
	}

	onPauseStopwatchClicked(): void {
		this.stopwatchChannel.postMessage('pause');
	}

	onResetStopwatchClicked(): void {
		this.stopwatchChannel.postMessage('reset');
	}
}
