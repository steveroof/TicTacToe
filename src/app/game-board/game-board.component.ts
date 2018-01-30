import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GameLogicService } from '../game-logic.service';
import { collectExternalReferences } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  @Output() onUpdateScore = new EventEmitter<number[]>();

  list: number[] = [0, 1, 2];

  constructor(private s: GameLogicService) { }

  ngOnInit() {
    //update score board when history is first loaded
    this.s.loadPreviousSession().then(resolve => { this.pushScoreBoard() });
  }

  playerMove(row: number, column: number) {
    this.s.playerMove(row, column);
    this.pushScoreBoard();
  }

  newGame() {
    this.s.newGame();
  }

  newSession() {
    this.s.newSession();
    this.pushScoreBoard();
  }

  pushScoreBoard() {
    this.onUpdateScore.emit([this.s.playerScore, this.s.aiScore]);
  }
}