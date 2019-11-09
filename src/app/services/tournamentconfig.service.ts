import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { TournamentConfig } from '../models/Tournament/TournamentConfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TournamentSettings } from '../models/Tournament/TournamentSettings';
import { SingleResponseDTO } from '../models/DTOs/SingleResponseDTO';
import { map } from 'rxjs/operators';
import { TournamentMode } from '../models/Tournament/TournamentMode';
import { ListResponseDTO } from '../models/DTOs/ListResponseDTO';

@Injectable({
    providedIn: 'root'
})
export class TournamentconfigService extends BaseService<TournamentConfig> {
    constructor(private httpClient: HttpClient) {
        super();
    }

    protected getRESTRessource(): string {
        return 'tournamentconfig';
    }

    public loadDefaultConfiguration(): Observable<TournamentConfig> {
        return this.httpClient
            .get<SingleResponseDTO<TournamentConfig>>(
                this.getAPIUrl() + '/defaultConfig'
            )
            .pipe(
                map(singleResponseDTO => {
                    return TournamentConfig.createFromJSON(singleResponseDTO.dtoValue);
                })
            );
    }

    public loadTournamentModes(): Observable<TournamentMode[]> {
        return this.httpClient
        .get<ListResponseDTO<TournamentMode>>(
            this.getAPIUrl() + '/tournamentmodes'
        )
        .pipe(
            map(listResponseDTO => {
                const tournamentModes = [];
                for (const jsonModeResponse of listResponseDTO.dtoValueList) {
                    tournamentModes.push(new TournamentMode(jsonModeResponse.key, jsonModeResponse.displayName));
                }
                return tournamentModes;
            })
        );
    }
}
