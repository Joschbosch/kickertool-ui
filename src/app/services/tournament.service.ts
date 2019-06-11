import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TournamentConfigurationDTO } from '../classes/TournamentConfigurationDTO';
import { SingleResponseDTO } from '../classes/responses/SingleResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

    private tournamentUrl = 'http://localhost:8080/api/tournament';

    constructor(private http: HttpClient) { }

    createNewTournament(config: TournamentConfigurationDTO): Observable<SingleResponseDTO<any>> {
        return this.http.post<SingleResponseDTO<any>>(this.tournamentUrl + '/createandstart', config);
    }
}
