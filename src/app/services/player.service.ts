import { Injectable } from '@angular/core';
import { Player } from '../classes/Player';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseDTO } from '../classes/responses/ListResponseDTO';
import { SingeResponseDTO } from '../classes/responses/SingleResponseDTO';
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

  insertNewPlayer(firstName: string, lastName: string): Observable<SingeResponseDTO<Player>> {

    const dummyPlayer: Player = {
        firstName,
        lastName
    };

    return this.http.post<SingeResponseDTO<Player>>(this.playerUrl, dummyPlayer);
  }

  deletePlayer(uuid: string): Observable<StatusOnlyDTO> {
    return this.http.delete<StatusOnlyDTO>(this.playerUrl + '/' + uuid);
  }

}
