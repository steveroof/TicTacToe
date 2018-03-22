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
