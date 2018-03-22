import { TestBed, inject } from "@angular/core/testing";

import { GameLogicService } from "./game-logic.service";
import { DataService } from "./data.service";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { BADSTR } from "dns";

describe("GameLogicService", () => {
  let gls: GameLogicService;
  let ds: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameLogicService, DataService, HttpClient, HttpHandler]
    });

    gls = TestBed.get(GameLogicService);
    ds = TestBed.get(DataService);
  });

  it("should be created", () => {
    expect(gls).toBeTruthy();
  });

  it("should be have a DataService", () => {
    expect(ds).toBeTruthy();
  });
});
