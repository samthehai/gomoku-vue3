// eslint-disable-next-line max-classes-per-file
import Board from './Board';
import { PlayerSymbol } from './types.d';
import worker from './worker';

export default class Player {
  name: string;

  symbol: PlayerSymbol;

  score: number = 0;

  constructor(name: string, symbol: PlayerSymbol) {
    this.name = name;

    this.symbol = symbol;
  }

  setScore(score: number): void {
    this.score = score;
  }

  // eslint-disable-next-line class-methods-use-this
  watch(_r: number, _c: number, _color: string): Promise<boolean> {
    return new Promise(resolve => {
      resolve(true);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  reset(): Promise<boolean> {
    return new Promise(resolve => {
      resolve(true);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  hardReset(): Promise<boolean> {
    this.score = 0;

    return this.reset();
  }
}

export class ComputerPlayer extends Player {
  mode: string;

  constructor(name: string, symbol: PlayerSymbol, mode: string) {
    super(name, symbol);
    this.mode = mode;
    worker.send({ type: 'init', color: symbol, mode });
  }

  // eslint-disable-next-line class-methods-use-this
  watch(r: number, c: number, color: string): Promise<boolean> {
    return worker.send({
      type: 'watch',
      r,
      c,
      color,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  reset(): Promise<boolean> {
    return worker.send({ type: 'init', color: this.symbol, mode: this.mode });
  }

  // eslint-disable-next-line class-methods-use-this
  hardReset(): Promise<boolean> {
    this.score = 0;

    return this.reset();
  }

  // eslint-disable-next-line class-methods-use-this
  async findBestMove(board: Board): Promise<{ r: number; c: number } | null> {
    if (board.filledNum === 0) {
      return { r: 7, c: 7 };
    }

    if (board.filledNum === 1) {
      const move = [
        { r: 6, c: 6 },
        { r: 6, c: 7 },
        { r: 6, c: 8 },
        { r: 7, c: 6 },
        { r: 7, c: 7 },
        { r: 7, c: 8 },
        { r: 8, c: 6 },
        { r: 8, c: 7 },
        { r: 8, c: 8 },
      ].find(({ r, c }) => !board.isSet(r, c));

      if (move) {
        return move;
      }
    }

    return worker.send({
      type: 'compute',
    });
  }
}
