import { Injectable } from '@angular/core';
import { cell, gameSession } from './app.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

  apiRoot: string = "http://localhost:5000/api";
  results: gameSession;

  constructor(private http: HttpClient) { }

  loadHistoryFromDatabase() {

    let promise = new Promise(resolve => {
      let apiURL = this.apiRoot + "/TicTacToe";
      this.http.get(apiURL).toPromise().then(
        success => {
          this.results = new gameSession();
          this.results.gameHistory[0] = JSON.parse(success[0].gameState);
          this.results.gameCount = 3;
          this.results.aiScore = 1
          this.results.playerScore = 2;
          resolve();
        }
      )
    });
    return promise;
  }

  addGameToDatabase(gameState: cell[][]) {
    let apiURL = this.apiRoot + "/TicTacToe";
    let body = JSON.stringify(gameState);
    let headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(apiURL, body, { headers }).subscribe(); //not working
  }

  deleteGameFromDatabase() {
    //code to delete from DB here
  }
}