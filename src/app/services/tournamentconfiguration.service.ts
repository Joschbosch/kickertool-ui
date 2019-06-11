import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SingleResponseDTO } from '../classes/responses/SingleResponseDTO';
import { TournamentConfigurationDTO } from '../classes/TournamentConfigurationDTO';
import { ListResponseDTO } from '../classes/responses/ListResponseDTO';
import { TournamentModeDTO } from '../classes/TournamentModeDTO';

@Injectable({
  providedIn: 'root'
})
export class TournamentconfigurationService {

    private tournamentConfigUrl = 'http://localhost:8080/api/tournamentconfig';

    constructor(private http: HttpClient) {}

    getDefaultConfig(): Observable<SingleResponseDTO<TournamentConfigurationDTO>> {
        return this.http.get<SingleResponseDTO<TournamentConfigurationDTO>>(this.tournamentConfigUrl + '/defaultConfig');
    }

    getTournamentModes(): Observable<ListResponseDTO<TournamentModeDTO>> {
        return this.http.get<ListResponseDTO<TournamentModeDTO>>(this.tournamentConfigUrl + '/tournamentmodes');
    }
}
