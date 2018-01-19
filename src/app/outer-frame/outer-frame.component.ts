import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-outer-frame',
  templateUrl: './outer-frame.component.html',
  styleUrls: ['./outer-frame.component.css']
})
export class OuterFrameComponent implements OnInit {
  Title: string;
  playerScore: number = 0;
  aiScore: number = 0;

  constructor() { }

  ngOnInit() {
    this.Title = "Tic Tac Toe!";
  }

  onUpdateScore(score: number[]) {
    this.playerScore = score[0];
    this.aiScore = score[1];
  }

}
