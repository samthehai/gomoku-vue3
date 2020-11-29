import { constant } from 'lodash';
import Board from './Board';
import Cell from './Cell';
import { DEFAULT_BOARD_LENGTH, EMPTY_CELL } from './constants';
import Player, { ComputerPlayer } from './Player';
import { PlayerSymbol } from './types.d';

export default class Game {
  player1: Player;

  player2: Player;

  board: Board;

  round: number;

  turn: PlayerSymbol = 'X';

  winner: Player | null = null;

  playing: boolean = false;

  constructor(player1: Player, player2: Player, boardLength?: number) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Board(boardLength || DEFAULT_BOARD_LENGTH);
    this.round = 0;
  }

  initialize(): void {
    this.board.initialize();
    this.winner = null;
    this.round = 0;
  }

  // eslint-disable-next-line class-methods-use-this
  randomPlayer(): PlayerSymbol {
    const rand = Math.floor(Math.random() * 2 + 1);
    return rand === 1 ? 'X' : 'O';
  }

  getPlayerBySymbol(symbol: PlayerSymbol): Player {
    if (this.player1.symbol === symbol) {
      return this.player1;
    }

    return this.player2;
  }

  start(): void {
    this.playing = true;
    this.turn = this.randomPlayer();

    setTimeout(() => {
      if (this.isComputerPlayer(this.currentPlayer())) {
        this.computerTurn();
        this.endTurn();
      }
    }, 0);
  }

  currentPlayer(): Player {
    return this.getPlayerBySymbol(this.turn);
  }

  // eslint-disable-next-line class-methods-use-this
  isComputerPlayer(player: Player): boolean {
    return player instanceof ComputerPlayer;
  }

  computerTurn(): void {
    const currentPlayer = this.currentPlayer();

    if (!this.isComputerPlayer(currentPlayer)) {
      return;
    }

    let nextMove: Cell | null = null;
    nextMove = (currentPlayer as ComputerPlayer).findBestMove(this.board);
    if (!nextMove) {
      return;
    }

    this.board.cells[nextMove.x][nextMove.y].setValue(currentPlayer.symbol || '');
  }

  playerTurn(position: { x: number; y: number }): void {
    const { x, y } = position;
    if (
      this.board.cells[x][y].value === EMPTY_CELL &&
      this.playing &&
      !this.isComputerPlayer(this.currentPlayer())
    ) {
      const symbol = this.turn;

      this.board.cells[x][y].setValue(symbol);
      this.endTurn();
    }
  }

  endTurn(): void {
    if (!this.playing) {
      return;
    }

    const winnerSymbol = this.board.checkWin();
    const winner = winnerSymbol ? this.getPlayerBySymbol(winnerSymbol) : null;
    if (winner) {
      this.playing = false;
      this.winner = winner;
      this.winner.score += 1;
      return;
    }

    if (!this.board.isMovesLeft()) {
      this.playing = false;
      return;
    }

    this.turn = this.nextTurn();

    setTimeout(() => {
      if (this.isComputerPlayer(this.currentPlayer())) {
        this.computerTurn();
        this.endTurn();
      }
    }, 0);
  }

  nextTurn(): PlayerSymbol {
    if (this.turn === 'X') {
      return 'O';
    }

    return 'X';
  }
}
