import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GameBoardComponent } from "./game-board.component";
import { GameLogicService } from "../game-logic.service";
import { DataService } from "../data.service";
import { HttpClient, HttpHandler } from "@angular/common/http";

describe("GameBoardComponent", () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;
  let gameLogicService: GameLogicService;
  let dataService: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameBoardComponent],
      providers: [GameLogicService, DataService, HttpClient, HttpHandler]
    });

    fixture = TestBed.createComponent(GameBoardComponent);

    //get instances of things out of the test bed to see if they exist
    component = fixture.componentInstance;
    gameLogicService = TestBed.get(GameLogicService);
    dataService = TestBed.get(DataService);
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });

  it("should have a GameLogicService", () => {
    expect(gameLogicService).toBeTruthy();
  });

  it("should have a DataService", () => {
    expect(dataService).toBeTruthy();
  });
});
