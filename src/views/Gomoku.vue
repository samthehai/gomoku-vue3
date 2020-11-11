<template>
  <div id="game" class="outer-container">
    <InformationBar
      v-if="shoudShowGameTopBar"
      :infos="playerScores"
      @click-hard-reset="resetGame"
    />
    <div class="board-container">
      <SelectOptions
        v-if="phrase == 'GAME_CHOICE'"
        title="Select Mode"
        :options="modeOptions"
        @click-item="chooseMode"
      />
      <SelectOptions
        v-if="phrase == 'GAME_STARTER'"
        title="Choose X or O?"
        backButton="display"
        :options="symbolOptions"
        @click-item="firstGame"
        @click-back="toGameChoice"
      />
      <SelectOptions
        v-if="phrase == 'GAME_SELECT_COM'"
        title="Choose Computer Agent"
        backButton="display"
        :options="computerAgentOptions"
        @click-item="selectComputerAI"
        @click-back="toGameChoice"
      />

      <div v-if="shouldShowGameBoard" class="game-board">
        <BoardView
          :board="board.currentBoards"
          :game-end-message="gameEndMessage"
          @click-reset="reset"
          @click-cell="playerTurn"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import BoardView from '@/components/BoardView.vue';
// eslint-disable-next-line no-unused-vars
import SelectOptions, { ViewOption } from '@/components/SelectOptions.vue';
import InformationBar, {
  // eslint-disable-next-line no-unused-vars
  InformationBarData,
} from '@/components/InformationBar.vue';
import {
  // eslint-disable-next-line no-unused-vars
  GamePhrases,
  // eslint-disable-next-line no-unused-vars
  PlayerSymbols,
  // eslint-disable-next-line no-unused-vars
  PlayerInfo,
  // eslint-disable-next-line no-unused-vars
  Player,
  // eslint-disable-next-line no-unused-vars
  ComputerAgent,
  // eslint-disable-next-line no-unused-vars
  GameMode,
} from '@/@types/globals.d';
import { PLAYER_SYMBOLS } from '@/lib/constants';

const BOARD_LENGTH = 19;
const EMPTY_CELL = ' ';
const EMPTY_STRING = '';

const inintializeBoardCells = (): string[][] => {
  const board: string[][] = [];
  for (let i = 0; i < BOARD_LENGTH; i += 1) {
    board[i] = [];
    for (let j = 0; j < BOARD_LENGTH; j += 1) {
      board[i][j] = EMPTY_CELL;
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

const ModeOptions: ViewOption[] = [
  {
    text: 'One Player',
    value: 'ONE_PLAYER' as GameMode,
  },
  {
    text: 'Two Player',
    value: 'TWO_PLAYER' as GameMode,
  },
];

const SymbolOptions: ViewOption[] = [
  {
    text: 'X',
    value: 'X' as PlayerSymbols,
  },
  {
    text: 'O',
    value: 'O' as PlayerSymbols,
  },
];

const ComputerAgentOptions: ViewOption[] = [
  {
    text: 'Po',
    value: 'PO' as ComputerAgent,
  },
  {
    text: 'Len',
    value: 'LEN' as ComputerAgent,
  },
];

@Options({
  // Specify `components` option.
  // See Vue.js docs for all available options:
  // https://vuejs.org/v2/api/#Options-Data
  components: {
    BoardView,
    SelectOptions,
    InformationBar,
  },
})
export default class Gomoku extends Vue {
  mounted(): void {
    this.initializeGame();
  }

  timeOuts = [];

  phrase = 'GAME_CHOICE' as GamePhrases;

  secondPlayer = false;

  turn = 'PLAYER_1' as Player;

  computerAI = 'PO' as ComputerAgent;

  player = {
    PLAYER_1: {
      name: 'Player1',
      symbol: 'O', // default is O
      score: 0,
    },
    PLAYER_2: {
      name: 'Computer',
      symbol: 'X', // default is X
      score: 0,
    },
  } as { [key: string]: PlayerInfo };

  board = initializeBoardValue() as {
    numFilledIn: number;
    currentBoards: string[][];
  };

  result = initializeResult() as { winner: Player | null };

  get playerScores(): InformationBarData[] {
    return [
      {
        text: 'Score',
        lists: [
          {
            text: this.playerOneName,
            value: this.player.PLAYER_1.score,
          },
          {
            text: this.playerTwoName,
            value: this.player.PLAYER_2.score,
          },
        ],
      },
      {
        text: this.turnStatus,
        lists: [],
      },
    ];
  }

  get shoudShowGameTopBar(): boolean {
    return ['PLAYING', 'END'].includes(this.phrase);
  }

  get shouldShowGameBoard(): boolean {
    return ['PLAYING', 'END'].includes(this.phrase);
  }

  get gameEndMessage(): string {
    if (this.phrase !== 'END') {
      return EMPTY_STRING;
    }

    if (!this.result.winner) {
      return 'It was a draw..';
    }

    const winnerNumber = this.result.winner === 'PLAYER_1' ? 1 : 2;
    if (this.secondPlayer) {
      return `Player ${winnerNumber} wins!! :D `;
    }

    if (this.result.winner === 'PLAYER_2') {
      return 'Uh oh, you lost..';
    }

    return 'You Won!!!';
  }

  get playerOneName(): string {
    return `${this.player.PLAYER_1.name}(${this.player.PLAYER_1.symbol})`;
  }

  get playerTwoName(): string {
    if (this.secondPlayer) {
      return `${this.player.PLAYER_2.name}(${this.player.PLAYER_2.symbol})`;
    }

    return `${this.computerAI.toLowerCase()}(${this.player.PLAYER_2.symbol})`;
  }

  get turnStatus(): string {
    if (this.phrase !== 'PLAYING') {
      return '';
    }

    if (this.turn === 'PLAYER_1') {
      return this.playerOneTurnMsg;
    }

    return this.playerTwoTurnMsg;
  }

  get playerTwoTurnMsg(): string {
    if (this.secondPlayer) {
      return 'Go Player 2!';
    }

    return "Computer's turn";
  }

  get playerOneTurnMsg(): string {
    if (this.secondPlayer) {
      return 'Go Player 1!';
    }

    return 'Your turn!';
  }

  // eslint-disable-next-line class-methods-use-this
  get modeOptions(): ViewOption[] {
    return ModeOptions;
  }

  // eslint-disable-next-line class-methods-use-this
  get symbolOptions(): ViewOption[] {
    return SymbolOptions;
  }

  // eslint-disable-next-line class-methods-use-this
  get computerAgentOptions(): ViewOption[] {
    return ComputerAgentOptions;
  }

  chooseMode(mode: GameMode) {
    this.secondPlayer = mode === 'TWO_PLAYER';

    if (this.secondPlayer) {
      this.toGameStarter();
      return;
    }

    this.toSelectComputer();
  }

  toGameStarter() {
    this.phrase = 'GAME_STARTER';
  }

  toSelectComputer() {
    this.phrase = 'GAME_SELECT_COM';
  }

  toGameChoice() {
    this.phrase = 'GAME_CHOICE';
  }

  initializeGame(): void {
    this.board = initializeBoardValue() as {
      numFilledIn: number;
      currentBoards: string[][];
    };
    this.result = initializeResult() as { winner: Player | null };
  }

  firstGame(playerOneSymbol: PlayerSymbols): void {
    this.player.PLAYER_1.symbol = playerOneSymbol;
    this.player.PLAYER_2.symbol =
      PLAYER_SYMBOLS.find((x) => x !== playerOneSymbol) || EMPTY_STRING;
    if (this.secondPlayer) {
      this.player.PLAYER_2.name = 'Player2';
    }
    this.turn = this.whoStarts();
    this.play();
  }

  // eslint-disable-next-line class-methods-use-this
  whoStarts(): string {
    return `PLAYER_${Math.floor(Math.random() * 2 + 1)}`;
  }

  selectComputerAI(name: ComputerAgent): void {
    this.computerAI = name;
    this.toGameStarter();
  }

  playerTurn(position: { x: number; y: number }): void {
    const { x, y } = position;
    if (
      this.board.currentBoards[x][y] === EMPTY_CELL &&
      this.phrase === 'PLAYING' &&
      (this.turn === 'PLAYER_1' ||
        (this.turn === 'PLAYER_2' && this.secondPlayer))
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
      this.endTurn();
    }
  }

  updateCurrentBoards(newBoards: string[][]): void {
    this.board.numFilledIn += 1;
    this.board.currentBoards = newBoards;
  }

  play(): void {
    this.phrase = 'PLAYING';
    setTimeout(() => {
      if (!this.secondPlayer && this.turn === 'PLAYER_2') {
        this.computerTurn();
        this.turn = 'PLAYER_1';
      }
    }, 0);
  }

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
          this.endTurn();
        }
      }, 0);
    } else if (this.turn === 'PLAYER_2') {
      this.turn = 'PLAYER_1';
    }
  }

  updateScore(winner: Player): void {
    if (winner) {
      this.player[winner].score += 1;
    }
  }

  checkWin(board: string[][]): Player | null {
    let winnerSymbol = EMPTY_STRING;
    // eslint-disable-next-line max-len
    const isWin = board.some((row, indexRow) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      row.some((cell, indexCell) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        winPattern.some((pattern) => {
          const symbol = board[indexRow][indexCell];

          if (symbol === EMPTY_CELL) return false;

          const isWinLocal2 = pattern.reduce((result, item) => {
            const x = indexRow + item[0];
            const y = indexCell + item[1];
            if (x >= BOARD_LENGTH || x < 0 || y >= BOARD_LENGTH || y < 0) {
              return false;
            }
            return result && board[x][y] === symbol;
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

    return winnerSymbol === this.player.PLAYER_1.symbol
      ? 'PLAYER_1'
      : 'PLAYER_2';
  }

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
      },
    );
    this.updateCurrentBoards(newBoard);
  }

  findBestMove(board: string[][]): { x: number; y: number } | null {
    let bestMove = null;
    let bestScore = -1000000;

    board.forEach((row, indexRow) => {
      row.forEach((_, indexCell) => {
        if (board[indexRow][indexCell] === EMPTY_CELL) {
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
  }

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
          if (board[r][c] === EMPTY_CELL) {
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
        if (board[r][c] === EMPTY_CELL) {
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
  }

  // eslint-disable-next-line class-methods-use-this
  isMovesLeft(board: string[][]): boolean {
    return board.some((row) => row.some((cell) => cell === EMPTY_CELL));
  }

  resetGame(): void {
    this.timeOuts.forEach((timer: number | undefined) => clearTimeout(timer));
    this.player.PLAYER_1.score = 0;
    this.player.PLAYER_2.score = 0;
    this.board = { ...this.board, ...initializeBoardValue() };
    this.phrase = 'GAME_CHOICE';
    this.turn = this.whoStarts();
  }

  reset(): void {
    this.timeOuts.forEach((timer: number | undefined) => clearTimeout(timer));
    this.initializeGame();
    this.turn = this.whoStarts();
    this.play();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.outer-container {
  position: relative;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  margin: 0 auto;
  text-align: center;
}

.board-container {
  width: 100%;
  height: 100%;
  /* background: rgba(40, 40, 40, 1); */
  background: rgba(255, 255, 255, 1);
  margin: 0 auto;
  margin-top: 10px;
}

.game-board {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
}
</style>
