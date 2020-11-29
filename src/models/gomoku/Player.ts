// eslint-disable-next-line max-classes-per-file
import Board from './Board';
import Cell from './Cell';
import { EMPTY_CELL, PLAYER_SYMBOLS } from './constants';
import { PlayerSymbol } from './types.d';

export default class Player {
  name: string;

  symbol: PlayerSymbol | null;

  score: number = 0;

  constructor(name: string, symbol?: PlayerSymbol) {
    this.name = name;

    this.symbol = symbol || null;
  }

  setScore(score: number): void {
    this.score = score;
  }

  setSymbol(symbol: PlayerSymbol) {
    this.symbol = symbol;
  }
}

export class ComputerPlayer extends Player {
  mode: string = 'normal';

  computing: boolean = false;

  worker = new Worker('./ai-worker.ts');

  constructor(name: string, symbol?: PlayerSymbol, mode?: string) {
    super(name, symbol);
    if (mode) this.mode = mode;
    this.registerEvent();
  }

  registerEvent(): void {
    this.worker.onmessage = e => {
      switch (e.data.type) {
        case 'decision':
          // eslint-disable-next-line no-console
          console.log(e.data);
          break;
        case 'starting':
          this.computing = true;
          break;
        default:
          // eslint-disable-next-line no-console
          console.log(e.data);
      }
    };

    this.worker.postMessage({
      type: 'initial',
      mode: this.mode,
    });
  }

  findBestMove(board: Board): Cell | null {
    let bestMove: Cell | null = null;
    let bestScore = -1000000;

    board.cells.forEach((row, indexRow) => {
      row.forEach((_, indexCell) => {
        if (board.cells[indexRow][indexCell].value === EMPTY_CELL) {
          const newBoard = new Board(board.length, board.cells);
          newBoard.cells[indexRow][indexCell].setValue(this.symbol || '');

          const newScore = this.minimax(newBoard, 0, false, -1000000, 1000000);

          if (newScore > bestScore) {
            bestScore = newScore;
            bestMove = new Cell(indexRow, indexCell);
          }
        }
      });
    });

    return bestMove;
  }

  minimax(board: Board, depth: number, isMax: boolean, alpha: number, beta: number): number {
    const winner = board.checkWin();
    if (winner === 'PLAYER_2') return 10 - depth;
    if (winner === 'PLAYER_1') return -10 + depth;

    if (!board.isMovesLeft()) return 4;
    if (depth >= 1) return 2;

    if (isMax) {
      let bestScore = -1000000;

      for (let r = 0; r < board.length; r += 1) {
        for (let c = 0; c < board.length; c += 1) {
          if (board.cells[r][c].value === EMPTY_CELL) {
            const newBoard = new Board(board.length, board.cells);
            newBoard.cells[r][c].setValue(this.symbol || '');

            const newScore = this.minimax(newBoard, depth + 1, !isMax, alpha, beta);

            if (newScore > bestScore) bestScore = newScore;
            // eslint-disable-next-line no-param-reassign
            if (bestScore > alpha) alpha = bestScore;
            if (alpha >= beta) {
              return bestScore;
            }
          }
        }
      }

      return bestScore;
    }
    let bestScore = 1000000;

    for (let r = 0; r < board.length; r += 1) {
      for (let c = 0; c < board.length; c += 1) {
        if (board.cells[r][c].value === EMPTY_CELL) {
          const newBoard = new Board(board.length, board.cells);
          newBoard.cells[r][c].setValue(PLAYER_SYMBOLS.find(item => item !== this.symbol) || '');

          const newScore = this.minimax(newBoard, depth + 1, !isMax, alpha, beta);

          if (newScore < bestScore) bestScore = newScore;
          // eslint-disable-next-line no-param-reassign
          if (bestScore < beta) beta = bestScore;
          if (alpha >= beta) return bestScore;
        }
      }
    }

    return bestScore;
  }
}
