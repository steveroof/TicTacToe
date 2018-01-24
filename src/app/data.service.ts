import { Injectable } from '@angular/core';
import { cell, gameSession } from './app.module';

@Injectable()
export class DataService {

  constructor() { }

  loadPreviousSession(): gameSession {
    //code to load from DB here
    let r = new gameSession();
    let json: string = '[[[{"value":"O","isWinner":0},{"value":"O","isWinner":0},{"value":"X","isWinner":1}],[{"value":"","isWinner":0},{"value":"X","isWinner":1},{"value":"","isWinner":0}],[{"value":"X","isWinner":1},{"value":"","isWinner":0},{"value":"","isWinner":0}]],[[{"value":"O","isWinner":2},{"value":"O","isWinner":2},{"value":"O","isWinner":2}],[{"value":"","isWinner":0},{"value":"","isWinner":0},{"value":"X","isWinner":0}],[{"value":"","isWinner":0},{"value":"","isWinner":0},{"value":"X","isWinner":0}]],[[{"value":"O","isWinner":0},{"value":"X","isWinner":1},{"value":"O","isWinner":0}],[{"value":"","isWinner":0},{"value":"X","isWinner":1},{"value":"","isWinner":0}],[{"value":"","isWinner":0},{"value":"X","isWinner":1},{"value":"","isWinner":0}]]]';
    r.gameHistory = JSON.parse(json);
    r.gameCount = 3;
    r.aiScore = 1
    r.playerScore = 2;
    return r;
  }

  deleteSession() {
    //code to delete from DB here
  }
}