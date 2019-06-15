import { Injectable } from '@angular/core';
import { Player } from '../classes/Player';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseDTO } from '../classes/responses/ListResponseDTO';
import { SingleResponseDTO } from '../classes/responses/SingleResponseDTO';
import { StatusOnlyDTO } from '../classes/responses/StatusOnlyDTO';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

    private playerUrl = 'http://localhost:8080/api/players';

  constructor(private http: HttpClient) { }

  getAllPlayer(): Observable<ListResponseDTO<Player>> {
    return this.http.get<ListResponseDTO<Player>>(this.playerUrl + '/getall');
  }

  getAllPlayerNotInTournament(tournamentId: string): Observable<ListResponseDTO<Player>> {
	  return this.http.get<ListResponseDTO<Player>>(this.playerUrl + '/getall-not-in-tournament/' + tournamentId);
  }

  insertNewPlayer(firstName: string, lastName: string): Observable<SingleResponseDTO<Player>> {

    const dummyPlayer: Player = {
        firstName,
		lastName,
		status: undefined,
		dummyPlayer: false
    };

    return this.http.post<SingleResponseDTO<Player>>(this.playerUrl, dummyPlayer);
  }

  deletePlayer(uuid: string): Observable<StatusOnlyDTO> {
    return this.http.delete<StatusOnlyDTO>(this.playerUrl + '/' + uuid);
  }

}
