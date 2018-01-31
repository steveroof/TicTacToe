import { Injectable } from '@angular/core';
import { cell, gameSession, winningCell } from './app.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { collectExternalReferences } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class DataService {

  apiRoot: string = "http://localhost:5000/api";
  results: gameSession;
  list: number[] = [0, 1, 2];

  constructor(private http: HttpClient) { }

  loadHistoryFromDatabase() {

    let promise = new Promise(resolve => {
      let apiURL = this.apiRoot + "/TicTacToe";
      this.http.get(apiURL).toPromise().then(
        success => {
          this.results = new gameSession();
          let currentGame: cell[][];
          let currentCell: cell;
          let foundWinner: boolean = false;

          for (let record of success as dbRecord[]) {

            foundWinner = false;
            currentGame = JSON.parse(record.gameState);
            this.results.gameHistory[this.results.gameCount] = currentGame

            for (let row of this.list) {
              if (foundWinner == true) break;
              for (let column of this.list) {
                if (foundWinner == true) break;
                currentCell = currentGame[row][column]
                if (currentCell.isWinner == winningCell.Player) {
                  this.results.playerScore++;
                  foundWinner = true;
                }
                else if (currentCell.isWinner == winningCell.AI) {
                  this.results.aiScore++;
                  foundWinner = true;
                }
              }
            }
            this.results.gameCount++;
          }
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
    this.http.post(apiURL, body, { headers }).subscribe();
  }

  deleteGameFromDatabase() {
    //code to delete from DB here
  }
}

class dbRecord {
  id: number;
  gameState: string;
}