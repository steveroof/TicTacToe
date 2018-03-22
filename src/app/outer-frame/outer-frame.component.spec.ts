import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OuterFrameComponent } from "./outer-frame.component";
import { GameBoardComponent } from "../game-board/game-board.component";
import { GameLogicService } from "../game-logic.service";
import { DataService } from "../data.service";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { DebugElement } from "@angular/core";

describe("OuterFrameComponent", () => {
  let component: OuterFrameComponent;
  let fixture: ComponentFixture<OuterFrameComponent>;
  let gbc: GameBoardComponent;
  let gls: GameLogicService;
  let ds: DataService;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [OuterFrameComponent, GameBoardComponent],
        providers: [GameLogicService, DataService, HttpClient, HttpHandler]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OuterFrameComponent);
    component = fixture.componentInstance;

    gls = TestBed.get(GameLogicService);
    ds = TestBed.get(DataService);

    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });

  it("should have the title variable 'Tic Tac Toe!'", () => {
    expect(component.Title).toEqual("Tic Tac Toe!");
  });

  it("should render 'Tic Tac Toe!' onto the page", () => {
    const h1: HTMLElement = fixture.debugElement.nativeElement.querySelector(
      "h1"
    );
    expect(h1.textContent).toEqual("Tic Tac Toe!");
  });

  it("should not render 'Banana!' onto the page", () => {
    const h1: HTMLElement = fixture.debugElement.nativeElement.querySelector(
      "h1"
    );
    expect(h1.textContent).not.toEqual("Banana!");
  });

  it("should have a GameLogicService", () => {
    expect(gls).toBeTruthy();
  });

  it("should have a DataService", () => {
    expect(ds).toBeTruthy();
  });
});
