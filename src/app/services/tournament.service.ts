import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TournamentConfigurationDTO } from '../classes/TournamentConfigurationDTO';
import { SingleResponseDTO } from '../classes/responses/SingleResponseDTO';
import { TournamentDTO } from '../classes/TournamentDTO';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

    private tournamentUrl = 'http://localhost:8080/api/tournament';

    constructor(private http: HttpClient) { }

    createNewTournament(config: TournamentConfigurationDTO): Observable<SingleResponseDTO<TournamentDTO>> {
        return this.http.post<SingleResponseDTO<TournamentDTO>>(this.tournamentUrl + '/createandstart', config);
    }
}
