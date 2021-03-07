import { PlayerSymbol } from '@/models/gomoku/types.d';
import { EMPTY_CELL } from '@/models/gomoku/constants';

import clonedeep from 'lodash/cloneDeep';
import Cell from './Cell';

// prettier-ignore
export const winPattern = [
  [ [0, 0],    [1, 0],    [2, 0],    [3, 0],    [4, 0],  ],
  [ [0, 0],    [0, 1],    [0, 2],    [0, 3],    [0, 4],  ],
  [ [0, 0],    [1, 1],    [2, 2],    [3, 3],    [4, 4],  ],
  [ [0, 0],    [-1, -1],  [-2, -2],  [-3, -3],  [-4, -4],],
  [ [0, 0],    [-1, 1],   [-2, 2],   [-3, 3],   [-4, 4], ],
  [ [0, 0],    [1, -1],   [2, -2],   [3, -3],   [4, -4], ],
];

export default class Board {
  length: number;

  filledNum: number = 0;

  cells!: Cell[][];

  constructor(length: number, cells?: Cell[][]) {
    this.length = length;
    if (cells) {
      this.cells = clonedeep(cells);
    } else {
      this.initialize();
    }
  }

  clone(): Board {
    return new Board(this.length, this.cells);
  }

  initialize(): void {
    this.initilizeCells();
  }

  initilizeCells(): void {
    this.cells = [];
    for (let i = 0; i < this.length; i += 1) {
      this.cells[i] = [];
      for (let j = 0; j < this.length; j += 1) {
        this.cells[i][j] = new Cell(i, j);
      }
    }
  }

  checkWin(): PlayerSymbol | null {
    let winnerSymbol = null;
    const isWin = this.cells.some((row, indexRow) =>
      row.some((_cell, indexCell) =>
        winPattern.some(pattern => {
          const symbol = this.cells[indexRow][indexCell].value;
          if (symbol === EMPTY_CELL) {
            return false;
          }

          const isWinLocal2 = pattern.reduce((result, item) => {
            const x = indexRow + item[0];
            const y = indexCell + item[1];
            if (x >= this.length || x < 0 || y >= this.length || y < 0) {
              return false;
            }
            return result && this.cells[x][y].value === symbol;
          }, true);

          if (isWinLocal2) {
            winnerSymbol = symbol;
          }

          return isWinLocal2;
        }),
      ),
    );

    if (!isWin) {
      return null;
    }

    return winnerSymbol;
  }

  isMovesLeft(): boolean {
    return this.cells.some(row => row.some(cell => cell.value === EMPTY_CELL));
  }

  setGo(r: number, c: number, symbol: PlayerSymbol): void {
    this.cells[r][c].setValue(symbol);
    this.filledNum += 1;
  }

  isSet(r: number, c: number): boolean {
    return this.cells[r][c].isSet();
  }
}
