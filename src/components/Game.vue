<template>
  <div id="game" class="outer-container">
    <div v-if="shoudShowGameTopBar">
      <button class="hard-reset" @click="resetGame">Reset All</button>
      <p class="score-1">
        <span class="points"> {{ player['PLAYER_1'].score }} </span
        ><span class="name">{{ playerOneName }}</span>
      </p>
      <i class="points-divider">&#124;</i>
      <p class="score-2">
        <span class="points">{{ player['PLAYER_2'].score }}</span
        ><span class="name">{{ playerTwoName }}</span>
      </p>
      <div v-if="shouldShowPlayerOneTurn" class="player-one-turn">
        <p>{{ playerOneTurnMsg }}</p>
      </div>
      <div v-if="shouldShowPlayerTwoTurn" class="player-two-turn">
        <p>{{ playerTwoTurnMsg }}</p>
      </div>
    </div>
    <div class="board-container">
      <div v-if="phrase == 'GAME_SELECT_COM'" class="game-choice">
        <p>Choose AI?</p>
        <button class="one-player" @click="selectComputerAI('PO')">Po</button>
        <button class="two-player" @click="selectComputerAI('LEN')">Len</button>
      </div>
      <div v-if="phrase == 'GAME_STARTER'" class="game-starter">
        <p>Choose X or O?</p>
        <button class="choose-x" @click="firstGame('X')">X</button>
        <button class="choose-o" @click="firstGame('O')">O</button>
        <button class="back-button" @click="toGameChoice">
          <i class="fa fa-arrow-left"></i> Back
        </button>
      </div>
      <div v-if="phrase == 'GAME_CHOICE'" class="game-choice">
        <p>Select</p>
        <button class="one-player" @click="choseOnePlayer">One Player</button>
        <button class="two-player" @click="choseSecondPlayer">
          Two Player
        </button>
      </div>
      <div class="game-board">
        <div v-if="shouldShowDrawMsg" class="draw-message" @click="reset">
          <p>{{ drawMsg }}</p>
        </div>
        <div v-if="shouldShowLoseMsg" class="lose-message" @click="reset">
          <p>{{ loseMsg }}</p>
        </div>
        <div v-if="shouldShowWinMsg" class="win-message" @click="reset">
          <p>{{ winMsg }}</p>
        </div>
        <table class="boxes">
          <tr v-for="(line, i) in board.currentBoards" v-bind:key="i">
            <td v-for="(cell, j) in line" v-bind:key="j" @click="playerTurn(i, j)">
              {{ cell }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

const GAME_PHRASES = [
  'GAME_CHOICE',
  'GAME_STARTER',
  'GAME_SELECT_COM',
  'PLAYING',
  'END',
];
type GamePhrases = typeof GAME_PHRASES[number];

const PLAYER_SYMBOLS = ['X', 'O'];
type PlayerSymbols = typeof PLAYER_SYMBOLS[number];

type PlayerInfo = {
  name: string;
  symbol: PlayerSymbols;
  score: number;
};

const PLAYERS = ['PLAYER_1', 'PLAYER_2'];
type Player = typeof PLAYERS[number];

const COMPUTER_AIS = ['PO', 'LEN'];
type ComputerAI = typeof COMPUTER_AIS[number];

const BOARD_LENGTH = 19;

const inintializeBoardCells = (): string[][] => {
  const board: string[][] = [];
  for (let i = 0; i < BOARD_LENGTH; i += 1) {
    board[i] = [];
    for (let j = 0; j < BOARD_LENGTH; j += 1) {
      board[i][j] = '';
    }
  }
  return board;
};

const initializeBoardValue = (): Object => ({
  numFilledIn: 0,
  currentBoards: inintializeBoardCells(),
});

const initializeResult = (): Object => ({
  winner: null as Player | null,
});

const winPattern = [
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ],
  [
    [0, 0],
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
  ],
  [
    [0, 0],
    [-1, -1],
    [-2, -2],
    [-3, -3],
    [-4, -4],
  ],
  [
    [0, 0],
    [-1, 1],
    [-2, 2],
    [-3, 3],
    [-4, 4],
  ],
  [
    [0, 0],
    [1, -1],
    [2, -2],
    [3, -3],
    [4, -4],
  ],
];

@Options({
  mounted() {
    this.initializeGame();
  },
  computed: {
    shoudShowGameTopBar(): boolean {
      return ['PLAYING', 'END'].includes(this.phrase);
    },
    winMsg(): string {
      if (!this.result.winner) {
        return '';
      }
      const winnerNumber = this.result.winner === 'PLAYER_1' ? 1 : 2;
      if (this.secondPlayer) {
        return `Player ${winnerNumber} wins!! :D `;
      }

      return 'You Won!!!';
    },
    loseMsg(): string {
      if (!this.result.winner) {
        return '';
      }
      const winnerNumber = this.result.winner === 'PLAYER_1' ? 1 : 2;
      if (this.secondPlayer) {
        return `Player ${winnerNumber} wins!! :D `;
      }

      return 'Uh oh, you lost..';
    },
    drawMsg(): string {
      return 'It was a draw..';
    },
    shouldShowDrawMsg(): boolean {
      return this.phrase === 'END' && !this.result.winner;
    },
    shouldShowLoseMsg(): boolean {
      return this.phrase === 'END' && this.result.winner === 'PLAYER_2';
    },
    shouldShowWinMsg(): boolean {
      return this.phrase === 'END' && this.result.winner === 'PLAYER_1';
    },
    playerOneName(): string {
      return `${this.player.PLAYER_1.name}(${this.player.PLAYER_1.symbol})`;
    },
    playerOneTurnMsg(): string {
      if (this.secondPlayer) {
        return 'Go Player 1!';
      }

      return 'Your turn!';
    },
    shouldShowPlayerOneTurn(): boolean {
      return this.phrase === 'PLAYING' && this.turn === 'PLAYER_1';
    },
    playerTwoName(): string {
      if (this.secondPlayer) {
        return `${this.player.PLAYER_2.name}(${this.player.PLAYER_2.symbol})`;
      }

      return `${this.computerAI.toLowerCase()}(${this.player.PLAYER_2.symbol})`;
    },
    playerTwoTurnMsg(): string {
      if (this.secondPlayer) {
        return 'Go Player 2!';
      }

      return "Computer's turn";
    },
    shouldShowPlayerTwoTurn(): boolean {
      return this.phrase === 'PLAYING' && this.turn === 'PLAYER_2';
    },
  },
  methods: {
    choseOnePlayer() {
      this.secondPlayer = false;
      this.toSelectComputer();
    },
    choseSecondPlayer() {
      this.secondPlayer = true;
      this.toGameStarter();
    },
    toGameStarter() {
      this.phrase = 'GAME_STARTER';
    },
    toSelectComputer() {
      this.phrase = 'GAME_SELECT_COM';
    },
    toGameChoice() {
      this.phrase = 'GAME_CHOICE';
    },
    initializeGame(): void {
      this.board = initializeBoardValue();
      this.result = initializeResult();
      // this.drawBoard();
    },
    firstGame(playerOneSymbol: PlayerSymbols): void {
      this.player.PLAYER_1.symbol = playerOneSymbol;
      this.player.PLAYER_2.symbol = PLAYER_SYMBOLS.find(
        (x) => x !== playerOneSymbol,
      );
      if (this.secondPlayer) {
        this.player.PLAYER_2.name = 'player 2';
      }
      this.turn = this.whoStarts();
      this.play();
    },
    whoStarts(): string {
      return `PLAYER_${Math.floor(Math.random() * 2 + 1)}`;
    },
    selectComputerAI(name: ComputerAI): void {
      this.computerAI = name;
      this.toGameStarter();
    },
    playerTurn(x: number, y: number): void {
      if (
        this.board.currentBoards[x][y] === ''
        && this.phrase === 'PLAYING'
        && (this.turn === 'PLAYER_1'
          || (this.turn === 'PLAYER_2' && this.secondPlayer))
      ) {
        const { symbol } = this.player[this.turn];
        const newBoards = this.board.currentBoards.map(
          (row: string[], rowIndex: number) => {
            if (x === rowIndex) {
              return row.map((cell, cellIndex) => {
                if (y === cellIndex) return symbol;
                return cell;
              });
            }
            return row;
          },
        );

        this.updateCurrentBoards(newBoards);
        this.endTurn(symbol);
      }
    },
    updateCurrentBoards(newBoards: string[][]): void {
      this.board.numFilledIn += 1;
      this.board.currentBoards = newBoards;
    },
    play(): void {
      this.phrase = 'PLAYING';
      setTimeout(() => {
        if (!this.secondPlayer && this.turn === 'PLAYER_2') {
          this.computerTurn();
          this.turn = 'PLAYER_1';
        }
      }, 0);
    },
    endTurn(): void {
      if (this.phrase !== 'PLAYING') {
        return;
      }

      const winner = this.checkWin(this.board.currentBoards);
      if (winner) {
        this.phrase = 'END';
        this.result = { ...this.result, winner };
        this.updateScore(winner);
        return;
      }

      if (this.board.numFilledIn >= BOARD_LENGTH * BOARD_LENGTH) {
        this.phrase = 'END';
        return;
      }

      if (this.turn === 'PLAYER_1') {
        this.turn = 'PLAYER_2';
        setTimeout(() => {
          if (!this.secondPlayer) {
            this.computerTurn();
            this.endTurn(this.player.PLAYER_2.symbol);
          }
        }, 0);
      } else if (this.turn === 'PLAYER_2') {
        this.turn = 'PLAYER_1';
      }
    },
    updateScore(winner: Player): void {
      if (winner) {
        this.player[winner].score += 1;
      }
    },
    checkWin(board: string[][]): Player | null {
      let winnerSymbol = '';
      // eslint-disable-next-line max-len
      const isWin = board.some(
        (row, indexRow) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          row.some(
            (cell, indexCell) =>
              // eslint-disable-next-line implicit-arrow-linebreak
              winPattern.some((pattern) => {
                const symbol = board[indexRow][indexCell];

                if (symbol === '') return false;

                const isWinLocal2 = pattern.reduce((result, item) => {
                  const x = indexRow + item[0];
                  const y = indexCell + item[1];
                  if (
                    x >= BOARD_LENGTH
                    || x < 0
                    || y >= BOARD_LENGTH
                    || y < 0
                  ) {
                    return false;
                  }
                  return result && board[x][y] === symbol;
                }, true);

                if (isWinLocal2) {
                  winnerSymbol = symbol;
                }

                return isWinLocal2;
                // eslint-disable-next-line comma-dangle
              })
            // eslint-disable-next-line function-paren-newline
          ),
        // eslint-disable-next-line function-paren-newline
      );

      if (!isWin) {
        return null;
      }

      return winnerSymbol === this.player.PLAYER_1.symbol
        ? 'PLAYER_1'
        : 'PLAYER_2';
    },
    computerTurn(): void {
      let nextMove: { x: number; y: number } | null = null;
      nextMove = this.findBestMove(this.board.currentBoards);

      if (!nextMove) {
        return;
      }

      const newBoard = this.board.currentBoards.map(
        (row: string[], rowIndex: number) => {
          if (nextMove?.x === rowIndex) {
            return row.map((cell, cellIndex) => {
              if (nextMove?.y === cellIndex) {
                return this.player.PLAYER_2.symbol;
              }

              return cell;
            });
          }
          return row;
          // eslint-disable-next-line comma-dangle
        }
      );
      this.updateCurrentBoards(newBoard);
    },
    findBestMove(board: string[][]): { x: number; y: number } | null {
      let bestMove = null;
      let bestScore = -1000000;

      board.forEach((row, indexRow) => {
        row.forEach((_, indexCell) => {
          if (board[indexRow][indexCell] === '') {
            const newBoard = board.map((row2, x) => {
              if (indexRow === x) {
                return row2.map((cell, y) => {
                  if (indexCell === y) {
                    return this.player.PLAYER_2.symbol;
                  }

                  return cell;
                });
              }

              return row2;
            });

            const newScore = this.minimaxLEN(
              newBoard,
              0,
              false,
              -1000000,
              1000000,
            );

            if (newScore > bestScore) {
              bestScore = newScore;
              bestMove = { x: indexRow, y: indexCell };
            }
          }
        });
      });

      return bestMove;
    },
    minimaxLEN(
      board: string[][],
      depth: number,
      isMax: boolean,
      alpha: number,
      beta: number,
    ): number {
      const winner = this.checkWin(board);
      if (winner === 'PLAYER_2') return 10 - depth;
      if (winner === 'PLAYER_1') return -10 + depth;

      if (!this.isMovesLeft(board)) return 4;
      if (depth >= 2) return 2;

      if (isMax) {
        let bestScore = -1000000;

        for (let r = 0; r < BOARD_LENGTH; r += 1) {
          for (let c = 0; c < BOARD_LENGTH; c += 1) {
            if (board[r][c] === '') {
              const newBoard = board.map((row, x) => {
                if (r === x) {
                  return row.map((cell, y) => {
                    if (c === y) {
                      return this.player.PLAYER_2.symbol;
                    }

                    return cell;
                  });
                }

                return row;
              });

              const newScore = this.minimaxLEN(
                newBoard,
                depth + 1,
                !isMax,
                alpha,
                beta,
              );

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

      for (let r = 0; r < BOARD_LENGTH; r += 1) {
        for (let c = 0; c < BOARD_LENGTH; c += 1) {
          if (board[r][c] === '') {
            const newBoard = board.map((row, x) => {
              if (r === x) {
                return row.map((cell, y) => {
                  if (c === y) {
                    return this.player.PLAYER_1.symbol;
                  }

                  return cell;
                });
              }

              return row;
            });

            const newScore = this.minimaxLEN(
              newBoard,
              depth + 1,
              !isMax,
              alpha,
              beta,
            );

            if (newScore < bestScore) bestScore = newScore;
            // eslint-disable-next-line no-param-reassign
            if (bestScore < beta) beta = bestScore;
            if (alpha >= beta) return bestScore;
          }
        }
      }

      return bestScore;
    },
    isMovesLeft(board: string[][]): boolean {
      return board.some((row) => row.some((cell) => cell === ''));
    },
    resetGame(): void {
      this.timeOuts.forEach((timer: number|undefined) => clearTimeout(timer));
      this.player.PLAYER_1.score = 0;
      this.player.PLAYER_2.score = 0;
      this.board = { ...this.board, ...initializeBoardValue() };
      this.phrase = 'GAME_CHOICE';
      this.turn = this.whoStarts();
    },
    reset(): void {
      this.timeOuts.forEach((timer: number|undefined) => clearTimeout(timer));
      this.initializeGame();
      this.turn = this.whoStarts();
      this.play();
    },
  },
})
export default class Game extends Vue {
  timeOuts = [];

  phrase = 'GAME_CHOICE' as GamePhrases;

  secondPlayer = false;

  turn = 'PLAYER_1' as Player;

  computerAI = 'PO' as ComputerAI;

  player = {
    PLAYER_1: {
      name: 'player 1',
      symbol: 'O', // default is O
      score: 0,
    },
    PLAYER_2: {
      name: 'computer',
      symbol: 'X', // default is X
      score: 0,
    },
  } as { [key: string]: PlayerInfo };

  board = initializeBoardValue();

  result = initializeResult();
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* reset css */
body,
html {
  width: 100%;
  height: 100%;
}

li {
  list-style: none;
}

/*****/
.outer-container {
  background: rgba(255, 255, 255, 1);
  box-shadow: inset -1px 1px 7px rgba(0, 0, 0, 0.2),
    inset 1px -1px 7px rgba(0, 0, 0, 0.2), 1px 12px 5px rgba(0, 0, 0, 0.4),
    4px 3px 8px rgba(0, 0, 0, 0.4), 5px 10px 10px rgba(0, 0, 0, 0.2),
    -5px 10px 10px rgba(0, 0, 0, 0.4);
  position: relative;
  border-radius: 10px;
  width: 600px;
  height: 600px;
  margin: 10% auto;
  padding: 40px 0 0;
}

.board-container {
  width: 589px;
  height: 550px;
  background: rgba(40, 40, 40, 1);
  background-size: cover;
  position: relative;
  margin: 0 auto;
  overflow: hidden;
}

.game-board {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
}

.boxes {
  padding: 0;
  width: 100%;
  height: 100%;
  position: relative;
  left: 0px;
  top: 0px;
}

.boxes tr {
  display: inline-block;
  position: relative;
  z-index: 1000;
  overflow: hidden;
}

.boxes tr td {
  font-size: 1rem;
  text-align: center;
  display: block;
  width: 25px;
  height: 25px;
  font-style: normal;
  font-family: 'Architects Daughter', 'Helvetica', 'sans-serif';
  color: rgba(220, 220, 220, 0.7);
  z-index: 500;
}

tr,
td {
  border: 0.1px solid darkslategrey;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

/* li span {
  position: relative;
  bottom: 15px;
}
 */
.draw-message,
.lose-message,
.win-message {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  z-index: 2000;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
}

.draw-message p,
.lose-message p,
.win-message p {
  color: white;
  text-align: center;
  position: absolute;
  font-size: 2.3rem;
  margin: 0;
  font-family: 'Architects Daughter', sans-serif;
}

/*============================================
          Game Starter
============================================*/
.game-choice,
.game-starter {
  background: rgba(40, 40, 40, 1);
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  text-align: center;
  font-family: 'Futura', Helvetica, sans-serif;
  z-index: 1500;
}

.game-choice p,
.game-starter p,
.game-starter button {
  font-size: 2.2rem;
}

.game-choice button,
.game-choice p,
.game-starter button,
.game-starter p {
  color: rgba(220, 220, 220, 1);
  position: relative;
  top: 50px;
  margin: 10px auto;
}

.game-choice button,
.game-starter button {
  background: none;
  border: none;
  opacity: 0.6;
  border-radius: 20px;
  border: 2px solid transparent;
  font-size: 2.2rem;
}

.game-choice button:focus,
.game-starter button:focus {
  outline: none;
}
.game-choice button:hover,
.game-starter button:hover {
  opacity: 1;
  border: 2px dashed rgba(230, 230, 230, 0.5);
}

.game-starter button.back-button {
  position: absolute;
  top: 270px;
  right: 130px;
  font-size: 1.5rem;
  border: none;
}

.game-starter .back-button:hover {
  border: none;
}

button {
  cursor: pointer;
}

/* Playing */

/* Player/Computer prompt */
.player-one-turn {
  background: rgba(0, 200, 200, 1);
  left: 15px;
}

.player-two-turn {
  background: rgba(200, 100, 100, 1);
  right: 15px;
}

.player-one-turn,
.player-two-turn {
  position: absolute;
  top: -45px;
  width: 170px;
  height: 50px;
  z-index: -10;
  color: white;
  text-align: center;
}

.player-one-turn p,
.player-two-turn p {
  font-size: 1.3rem;
  margin-top: 10px;
}

/* Score keeping */
.points-divider,
.score-1,
.score-2 {
  position: absolute;
  font-size: 0.9rem;
  margin: 0;
}

.score-1,
.score-2 {
  font-family: 'Futura', sans-serif;
  top: 17px;
  color: rgba(100, 60, 50, 0.8);
}

.score-1 .points,
.score-2 .points {
  position: absolute;
  text-align: center;
  bottom: 14px;
  color: rgba(100, 60, 50, 0.9);
  font-family: 'Futura', sans-serif;
}

.points-divider {
  top: 5px;
  left: 141px;
  font-size: 2rem;
  font-family: helvetica, sans-serif;
  font-style: normal;
  opacity: 0.2;
}

.score-1 {
  left: 50px;
}

.score-2 {
  left: 161px;
}

/* reset button */
.hard-reset {
  position: absolute;
  top: 5px;
  right: 20px;
  background: none;
  border: none;
  font-family: 'Architects Daughter', sans-serif;
  color: rgba(100, 60, 50, 0.8);
  font-size: 1.1rem;
  border-radius: 20px;
  border: 2px dashed transparent;
}

.hard-reset:hover {
  border: 2px dashed rgba(100, 60, 50, 1);
  color: rgba(100, 60, 50, 1);
}

.hard-reset:focus {
  outline: none;
}
</style>
