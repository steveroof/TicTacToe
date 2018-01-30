import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { OuterFrameComponent } from './outer-frame/outer-frame.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameLogicService } from './game-logic.service';
import { DataService } from './data.service';


@NgModule({
  declarations: [
    AppComponent,
    OuterFrameComponent,
    GameBoardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [GameLogicService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

//game specific custom classes
export class cell {
  value: string = "";
  isWinner: winningCell = winningCell.None;
}

export class winningState {
  cells: cell[] = [];
}

export enum winningCell {
  None = 0,
  Player = 1,
  AI = 2
}

export class gameSession {
  gameHistory: cell[][][] = [];
  gameCount: number = 0;
  playerScore: number = 0;
  aiScore: number = 0;
}