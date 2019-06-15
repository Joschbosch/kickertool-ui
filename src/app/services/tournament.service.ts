import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TournamentConfigurationDTO } from '../classes/TournamentConfigurationDTO';
import { SingleResponseDTO } from '../classes/responses/SingleResponseDTO';
import { TournamentDTO } from '../classes/TournamentDTO';
import { StatusOnlyDTO } from '../classes/responses/StatusOnlyDTO';
import { ListResponseDTO } from '../classes/responses/ListResponseDTO';
import { PlayerRankingRow } from '../classes/PlayerRankingRow';
import { MatchResultDTO } from '../classes/MatchResultDTO';

// tslint:disable: indent
@Injectable({
  providedIn: 'root'
})
export class TournamentService {

	private tournamentUrl = 'http://localhost:8080/api/tournament';

	constructor(private http: HttpClient) { }

	createNewTournament(config: TournamentConfigurationDTO): Observable<SingleResponseDTO<TournamentDTO>> {
		return this.http.post<SingleResponseDTO<TournamentDTO>>(this.tournamentUrl + '/createandstart', config);
	}

	getTournament(uuid: string): Observable<SingleResponseDTO<TournamentDTO>> {
		return this.http.get<SingleResponseDTO<TournamentDTO>>(this.tournamentUrl + '/' + uuid);
	}

	startNextRound(uuid: string): Observable<SingleResponseDTO<TournamentDTO>> {
		return this.http.get<SingleResponseDTO<TournamentDTO>>(this.tournamentUrl + '/nextround/' + uuid);
	}

	enterOrChangeMatchResult(uuid: string, matchResultDTO: MatchResultDTO): Observable<StatusOnlyDTO> {
		return this.http.post<StatusOnlyDTO>(this.tournamentUrl + '/postmatchresult/' + uuid, matchResultDTO);
	}

	getPlayerRankings(uuid: string, roundNr: number): Observable<ListResponseDTO<PlayerRankingRow>> {
		return this.http.get<ListResponseDTO<PlayerRankingRow>>(this.tournamentUrl + '/getranking/' + uuid + '/' + roundNr);
	}

	pausePlayer(tournamendId: string, playerId: string): Observable<SingleResponseDTO<TournamentDTO>> {
		return this.http.put<SingleResponseDTO<TournamentDTO>>(this.tournamentUrl + '/pauseplayer/' + tournamendId + '/' + playerId, {});
	}

	resumePlayer(tournamendId: string, playerId: string): Observable<SingleResponseDTO<TournamentDTO>> {
		return this.http.put<SingleResponseDTO<TournamentDTO>>(this.tournamentUrl + '/unpauseplayer/' + tournamendId + '/' + playerId, {});
	}

}
