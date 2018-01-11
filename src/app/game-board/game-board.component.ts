import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  gameState: cell[][];
  isPlayersTurn: boolean = false;
  playerMarker: string = "X";
  aiMarker: string = "O";
  playerScore: number = 0;
  aiScore: number = 0;
  isGameOver: boolean = false;

  constructor() { }

  ngOnInit() {
    this.initializeGameState();
  }

  initializeGameState() {
    //create the 2d array representing the game state
    this.gameState = [];
    for (var i: number = 0; i < 3; i++) {
      this.gameState[i] = [];
      for (var j: number = 0; j < 3; j++) {
        this.gameState[i][j] = new cell();
      }
    }

    this.isPlayersTurn = !this.isPlayersTurn;
    if (!this.isPlayersTurn) this.aiMove();
  }

  gridSelected(row: number, column: number) {
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
  //todo: create "ai service"
  aiMove() {
    let exitLoop: boolean = false;

    for (var i: number = 0; i < 3; i++) {
      if (!exitLoop) {
        for (var j: number = 0; j < 3; j++) {
          if (this.gameState[i][j].value == "") {
            this.gameState[i][j].value = this.aiMarker;
            exitLoop = true;
            break;
          }
        }
      }
    }
    this.checkWinner(this.aiMarker);
  }

  checkWinner(marker: string) {

    //complete row
    for (var row: number = 0; row < 3; row++) {
      if (this.gameState[row][0].value == marker && this.gameState[row][1].value == marker && this.gameState[row][2].value == marker) {
        this.gameState[row][0].isWinner = true;
        this.gameState[row][1].isWinner = true;
        this.gameState[row][2].isWinner = true;
        this.setWinner(marker);
      }
    }
    //complete column
    for (var column: number = 0; column < 3; column++) {
      if (this.gameState[0][column].value == marker && this.gameState[1][column].value == marker && this.gameState[2][column].value == marker) {
        this.gameState[0][column].isWinner = true;
        this.gameState[1][column].isWinner = true;
        this.gameState[2][column].isWinner = true;
        this.setWinner(marker);
      }
    }
    //complete diagonal
    if (this.gameState[0][0].value == marker && this.gameState[1][1].value == marker && this.gameState[2][2].value == marker) {
      this.gameState[0][0].isWinner = true;
      this.gameState[1][1].isWinner = true;
      this.gameState[2][2].isWinner = true;
      this.setWinner(marker);
    }
    if (this.gameState[0][2].value == marker && this.gameState[1][1].value == marker && this.gameState[2][0].value == marker) {
      this.gameState[0][2].isWinner = true;
      this.gameState[1][1].isWinner = true;
      this.gameState[2][0].isWinner = true;
      this.setWinner(marker);
    }
  }

  setWinner(marker: string) {
    this.isGameOver = true;
    if (marker == this.playerMarker) this.playerScore++;
    if (marker == this.aiMarker) this.aiScore++;
  }

  newGame() {
    this.isGameOver = false;
    this.initializeGameState();
  }
}

class cell {
  value: string = "";
  isWinner: boolean = false;
}