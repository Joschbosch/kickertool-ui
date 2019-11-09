import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, single } from 'rxjs/operators';
import { Player } from 'src/app/models/Player/Player';
import { HttpClient } from '@angular/common/http';
import { ListResponseDTO } from 'src/app/models/DTOs/ListResponseDTO';
import { BaseService } from './base.service';
import { SingleResponseDTO } from '../models/DTOs/SingleResponseDTO';
import { StatusOnlyDTO } from '../models/DTOs/StatusOnlyDTO';

@Injectable({
    providedIn: 'root'
})
export class PlayerService extends BaseService<Player> {

    constructor(private httpClient: HttpClient) {
        super();
    }

    getRESTRessource(): string {
        return 'players';
    }

    public loadAllPlayers(): Observable<Player[]> {
        return this.httpClient
            .get<ListResponseDTO<Player>>(
                this.getAPIUrl() + '/getall'
            )
            .pipe(
                map(listResponseDTO => {
                    const resultPlayers = [];
                    for (const playerPrototype of listResponseDTO.dtoValueList) {
                        resultPlayers.push(Player.createFromJSON(playerPrototype));
                    }
                    return resultPlayers;
                })
            );
    }

    public createNewPlayer(fullName: string): Observable<Player> {
        const nameSplit = fullName.split(' ');
        const playerDTO = new Player('', nameSplit[0], nameSplit[1]);

        return this.httpClient
            .post<SingleResponseDTO<Player>>(
                this.getAPIUrl(),
                playerDTO
            )
            .pipe(
                map(singleResponse => {
                    return Player.createFromJSON(singleResponse.dtoValue);
                })
            );
    }

    public deletePlayer(uid: string): Observable<boolean> {
        return this.httpClient
            .delete<StatusOnlyDTO>(
                this.getAPIUrl() + '/' + uid
            )
            .pipe(
                map(() => {
                    return true;
                })
            );
    }

}
