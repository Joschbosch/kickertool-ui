import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Player } from '../classes/Player';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-playeredit',
  templateUrl: './playeredit.component.html',
  styleUrls: ['./playeredit.component.css']
})
export class PlayereditComponent implements OnInit {

    @ViewChild('newplayername', {static: false}) inputForm: ElementRef;

    players = Player[0];

    constructor(private playerService: PlayerService) { }

    getAllPlayer(): void {
        this.players = this.playerService.getAllPlayer();
    }

    addPlayer(newName: string) {

        const nameSplit = newName.split(' ');

        this.players.push({
            id: '',
            firstName: nameSplit[0],
            lastName: nameSplit[1]
        });

        this.inputForm.nativeElement.value = '';
    }

    ngOnInit() {
        this.getAllPlayer();
    }

}
