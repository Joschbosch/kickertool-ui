import { Component, OnInit } from '@angular/core';
import { PlayerRankingRow } from 'src/app/models/Tournament/PlayerRankingRowDTO';

@Component({
    selector: 'app-rankingdetails',
    templateUrl: './rankingdetails.component.html',
    styleUrls: ['./rankingdetails.component.scss']
})
export class RankingdetailsComponent implements OnInit {
    selectedRankingRow: PlayerRankingRow;

    constructor() {}

    ngOnInit() {}

    initForRankingRow(rankingRow: PlayerRankingRow) {
        this.selectedRankingRow = rankingRow;
    }
}
