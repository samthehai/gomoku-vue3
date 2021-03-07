import Board from './Board';
import { DEFAULT_BOARD_LENGTH } from './constants';
import Player, { ComputerPlayer } from './Player';
import { PlayerSymbol } from './types.d';

export default class Game {
  player1: Player;

  player2: Player;

  board: Board;

  turn: PlayerSymbol = 'X';

  winner: Player | null = null;

  playing: boolean = false;

  constructor(player1: Player, player2: Player, boardLength?: number) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Board(boardLength || DEFAULT_BOARD_LENGTH);
  }

  initialize(): void {
    this.board.initialize();
    this.winner = null;
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

    (currentPlayer as ComputerPlayer)
      .findBestMove(this.board)
      .then((move: { r: number; c: number } | null) => {
        if (!move) {
          return;
        }

        this.board.setGo(move.r, move.c, currentPlayer.symbol);
        this.player1.watch(move.r, move.c, currentPlayer.symbol);
        this.player2.watch(move.r, move.c, currentPlayer.symbol);
        this.endTurn();
      });
  }

  playerTurn(position: { r: number; c: number }): void {
    const { r, c } = position;

    if (!this.board.isSet(r, c) && this.playing && !this.isComputerPlayer(this.currentPlayer())) {
      const symbol = this.turn;
      this.board.setGo(r, c, symbol);
      this.player1.watch(r, c, symbol);
      this.player2.watch(r, c, symbol);
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
