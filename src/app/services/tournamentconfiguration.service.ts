import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SingeResponseDTO } from '../classes/responses/SingleResponseDTO';
import { TournamentConfiguration } from '../classes/TournamentConfiguration';

@Injectable({
  providedIn: 'root'
})
export class TournamentconfigurationService {

    private tournamentConfigUrl = 'http://localhost:8080/api/tournamentconfig';

    constructor(private http: HttpClient) {}

    getDefaultConfig(): Observable<SingeResponseDTO<TournamentConfiguration>> {
        return this.http.get<SingeResponseDTO<TournamentConfiguration>>(this.tournamentConfigUrl + '/defaultConfig');
    }
}
