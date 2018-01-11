import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { OuterFrameComponent } from './outer-frame/outer-frame.component';
import { GameBoardComponent } from './game-board/game-board.component';


@NgModule({
  declarations: [
    AppComponent,
    OuterFrameComponent,
    GameBoardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
