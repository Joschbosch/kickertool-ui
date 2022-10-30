import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Tournament } from '../models/Tournament/Tournament';
import { TournamentConfig } from '../models/Tournament/TournamentConfig';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SingleResponseDTO } from '../models/DTOs/SingleResponseDTO';
import { PlayerRankingRow } from '../models/Tournament/PlayerRankingRowDTO';
import { ListResponseDTO } from '../models/DTOs/ListResponseDTO';
import { Player } from '../models/Player/Player';
import { MatchResult } from '../models/Matches/MatchResult';
import { StatusOnlyDTO } from '../models/DTOs/StatusOnlyDTO';

@Injectable({
    providedIn: 'root'
})
export class TournamentService extends BaseService<Tournament> {
    protected getRESTRessource(): string {
        return 'tournament';
    }

    constructor(private httpClient: HttpClient) {
        super();
    }

    public createAndStartTournament(tournamentConfig: TournamentConfig): Observable<Tournament> {
        return this.httpClient
            .post<SingleResponseDTO<Tournament>>(this.getAPIUrl() + '/createandstart', tournamentConfig)
            .pipe(
                map(singleResponseDTO => {
                    return Tournament.createFromJSON(
                        singleResponseDTO.dtoValue
                    );
                })
            );
    }

    public getCurrentTournament(tournamentUUID: string): Observable<Tournament> {
        return this.httpClient
            .get<SingleResponseDTO<Tournament>>(this.getAPIUrl() + '/' + tournamentUUID)
            .pipe(
                map(singleResponseDTO => {
                    return Tournament.createFromJSON(
                        singleResponseDTO.dtoValue
                    );
                })
            );
    }

    public getRankingForRound(tournamentUUID: string, roundNo: number): Observable<PlayerRankingRow[]> {
        return this.httpClient
            .get<ListResponseDTO<PlayerRankingRow>>(this.getAPIUrl() + '/getranking/' + tournamentUUID + '/' + roundNo)
            .pipe(
                map(listResponseDTO => {
                    const rankingRows = [];
                    for (const jsonRankingRow of listResponseDTO.dtoValueList) {
                        rankingRows.push(PlayerRankingRow.createFromJSON(jsonRankingRow));
                    }
                    return rankingRows;
                })
            );
    }

    public startNextRound(tournamentUUID: string): Observable<Tournament> {
        return this.httpClient
            .get<SingleResponseDTO<Tournament>>(this.getAPIUrl() + '/nextround/' + tournamentUUID)
            .pipe(
                map(singleResponseDTO => {
                    return Tournament.createFromJSON(
                        singleResponseDTO.dtoValue
                    );
                })
            );
    }

    public enterOrChangeMatchResult(tournamentUUID: string, matchResult: MatchResult): Observable<StatusOnlyDTO> {
        return this.httpClient.post<StatusOnlyDTO>(this.getAPIUrl() + '/postmatchresult/' + tournamentUUID, matchResult);
    }

    public pausePlayer(tournamentUUID: string, player: Player): Observable<Tournament> {
        return this.httpClient
            .put<SingleResponseDTO<Tournament>>(this.getAPIUrl() + '/pauseplayer/' + tournamentUUID + '/' + player.uid, {})
            .pipe(
                map(singleResponseDTO => {
                    return Tournament.createFromJSON(
                        singleResponseDTO.dtoValue
                    );
                })
            );
    }

    public resumePlayer(tournamentUUID: string, player: Player): Observable<Tournament> {
        return this.httpClient
            .put<SingleResponseDTO<Tournament>>(this.getAPIUrl() + '/unpauseplayer/' + tournamentUUID + '/' + player.uid, {})
            .pipe(
                map(singleResponseDTO => {
                    return Tournament.createFromJSON(
                        singleResponseDTO.dtoValue
                    );
                })
            );
    }

    public removePlayerFromTournament(tournamentUUID: string, player: Player): Observable<Player[]> {
        return this.httpClient
            .delete<ListResponseDTO<Player>>(this.getAPIUrl() + '/removeplayer/' + tournamentUUID + '/' + player.uid)
            .pipe(
                map(listResponseDTO => {
                    const resultPlayer = [];
                    for (const jsonPlayerResponse of listResponseDTO.dtoValueList) {
                        resultPlayer.push(Player.createFromJSON(jsonPlayerResponse));
                    }
                    return resultPlayer;
                })
            );
    }

    public addPlayerToTournament(tournamentUUID: string, player: Player): Observable<Player[]> {
        console.log(tournamentUUID);
        const playerIds = [player.uid];

        return this.httpClient
            .put<ListResponseDTO<Player>>(this.getAPIUrl() + '/addplayers/' + tournamentUUID, { playerIds })
            .pipe(
                map(listResponseDTO => {
                    const resultPlayer = [];
                    for (const jsonPlayerResponse of listResponseDTO.dtoValueList) {
                        resultPlayer.push(Player.createFromJSON(jsonPlayerResponse));
                    }
                    return resultPlayer;
                })
            );
    }

}
