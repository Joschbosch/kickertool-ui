import { Injectable } from '@angular/core';
import { Player } from '../classes/Player';
import { PLAYERS } from '../services/mock-players';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor() { }

  getAllPlayer(): Player[] {
    return PLAYERS;
  }
}
