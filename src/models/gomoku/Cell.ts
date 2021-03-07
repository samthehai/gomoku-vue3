import { PlayerSymbol } from '@/models/gomoku/types.d';
import { EMPTY_CELL } from './constants';

export default class Cell {
  x: number;

  y: number;

  value: PlayerSymbol = '';

  constructor(x: number, y: number, value?: PlayerSymbol) {
    this.x = x;
    this.y = y;
    if (value) {
      this.value = value;
    }
  }

  setValue(value: PlayerSymbol): void {
    this.value = value;
  }

  isSet(): boolean {
    return this.value !== EMPTY_CELL;
  }
}
