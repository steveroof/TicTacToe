import { Injectable, Output, EventEmitter } from '@angular/core';
import { cell, winningState, winningCell, gameSession } from './app.module';
import { DataService } from './data.service';

@Injectable()
export class GameLogicService {

  gameState: cell[][];
  isPlayersTurn: boolean = false;
  playerMarker: string = "X";
  aiMarker: string = "O";
  isGameOver: boolean = false;
  list: number[] = [0, 1, 2];
  winningStates: winningState[];
  gameHistory: cell[][][];
  playerScore: number = 0;
  aiScore: number = 0;
  totalGames: number = 1;

  constructor(private d: DataService) {
    this.gameHistory = [];
    this.initializeGameState();
  }

  evaluateGameState() {
    //possible states that would be a win: 3 rows, 3 columns, 2 diagonals = 8 total
    this.winningStates = [];
    let ws: winningState;
    let ws2: winningState;

    //rows and columns
    for (let i of this.list) {
      ws = new winningState();
      ws2 = new winningState();
      for (let j of this.list) {
        ws.cells[j] = this.gameState[i][j];
        ws2.cells[j] = this.gameState[j][i];
      }
      this.winningStates.push(ws);
      this.winningStates.push(ws2);
    }

    //diagonals
    ws = new winningState()
    ws2 = new winningState()
    for (let i of this.list) {
      ws.cells[i] = this.gameState[i][i];
      ws2.cells[i] = this.gameState[i][2 - i];
    }
    this.winningStates.push(ws);
    this.winningStates.push(ws2);
  }

  initializeGameState() {
    //create the 2d array representing the game state
    this.gameState = [];
    for (let row of this.list) {
      this.gameState[row] = [];
      for (let column of this.list) {
        this.gameState[row][column] = new cell();
      }
    }

    this.isPlayersTurn = !this.isPlayersTurn;
    if (!this.isPlayersTurn) this.aiMove();
  }

  playerMove(row: number, column: number) {
    if (this.isGameOver) {
      alert('The game is over!');
      return;
    }

    if (this.gameState[row][column].value == "") {
      this.gameState[row][column].value = this.playerMarker;
      this.checkWinner(this.playerMarker);
      if (!this.isGameOver) this.aiMove();
    }
    else {
      alert('This spot is already taken!');
    }
  }

  aiMove() {
    for (let row of this.list) {
      for (let column of this.list) {
        if (this.gameState[row][column].value == "") {
          this.gameState[row][column].value = this.aiMarker;
          this.checkWinner(this.aiMarker);
          return;
        }
      }
    }
  }

  checkWinner(marker: string) {

    this.evaluateGameState();

    let count: number;
    for (let state of this.winningStates) {
      count = 0;
      for (let cell of state.cells) {
        if (cell.value == marker) count++;
      }
      if (count == 3) {
        for (let cell of state.cells) {
          marker == this.playerMarker ? cell.isWinner = winningCell.Player : cell.isWinner = winningCell.AI;
        }
        this.setWinner(marker);
      }
    }
    let flatArray: cell[] = [];
    if (!this.isGameOver) { //check if it's a draw
      for (let row of this.list) {
        for (let column of this.list)
          flatArray.push(this.gameState[row][column]);
      }
      if (flatArray.every(this.allSpotsTakenNoWinner)) this.isGameOver = true;
    }
  }

  allSpotsTakenNoWinner(cell: cell) {
    return (cell.value != "" && cell.isWinner == winningCell.None);
  }

  setWinner(marker: string) {
    this.isGameOver = true;
    if (marker == this.playerMarker) this.playerScore++;
    if (marker == this.aiMarker) this.aiScore++;
  }

  newGame() {
    this.commitHistory();
    this.isGameOver = false;
    this.initializeGameState();
    this.totalGames++;
  }

  commitHistory() {
    this.gameHistory.push(this.gameState);
    this.d.addGameToDatabase(this.gameState);
  }

  loadPreviousSession() {
    let promise = new Promise(resolve => {
      this.d.loadHistoryFromDatabase().then(success=>{
        this.setSession(this.d.results);
        resolve();
      })
    });
    return promise;
  }

  newSession() {
    this.newGame();
    this.d.deleteGameFromDatabase();
    let gs: gameSession = new gameSession();
    this.setSession(gs);
  }

  setSession(gs: gameSession) {
    this.gameHistory = gs.gameHistory;
    this.totalGames = gs.gameCount + 1;
    this.playerScore = gs.playerScore;
    this.aiScore = gs.aiScore;
  }
}