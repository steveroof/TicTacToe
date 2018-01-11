import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-outer-frame',
  templateUrl: './outer-frame.component.html',
  styleUrls: ['./outer-frame.component.css']
})
export class OuterFrameComponent implements OnInit {
  Title: string;
  constructor() { }

  ngOnInit() {
    this.Title = "Tic Tac Toe!";
  }

}
