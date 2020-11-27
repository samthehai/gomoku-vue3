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
          :board="board.cells"
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
  GamePhrase,
  // eslint-disable-next-line no-unused-vars
  PlayerSymbol,
  // eslint-disable-next-line no-unused-vars
  ComputerAgent,
  // eslint-disable-next-line no-unused-vars
  GameMode,
} from '@/models/gomoku/types.d';
import { PLAYER_SYMBOLS, EMPTY_CELL } from '@/models/gomoku/constants';
import Board from '@/models/gomoku/Board';
// eslint-disable-next-line no-unused-vars
import Player, { ComputerPlayer } from '@/models/gomoku/Player';
// eslint-disable-next-line no-unused-vars
import Cell from '@/models/gomoku/Cell';

const BOARD_LENGTH = 14;
const EMPTY_STRING = '';

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
    value: 'X' as PlayerSymbol,
  },
  {
    text: 'O',
    value: 'O' as PlayerSymbol,
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

  phrase: GamePhrase = 'GAME_CHOICE';

  mode: GameMode = 'ONE_PLAYER';

  turn: PlayerSymbol = 'X';

  player1: Player = new Player('Player 1');

  player2: ComputerPlayer = new ComputerPlayer('Player 2');

  board: Board = new Board(BOARD_LENGTH);

  winner: Player | null = null;

  initializeGame(): void {
    this.board.initialize();
    this.winner = null;
  }

  get playerScores(): InformationBarData[] {
    return [
      {
        text: this.turnStatus,
        lists: [],
      },
      {
        text: '',
        lists: [
          {
            text: this.player1?.name || '',
            value: this.player1?.score || 0,
          },
          {
            text: this.player2?.name || '',
            value: this.player2?.score || 0,
          },
        ],
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

    if (!this.winner) {
      return 'It was a draw..';
    }

    if (this.mode === 'TWO_PLAYER') {
      return `${this.winner.name} wins!! :D `;
    }

    if (this.winner === this.player2) {
      return 'Uh oh, you lost..';
    }

    return 'You Won!!!';
  }

  get turnStatus(): string {
    if (this.phrase !== 'PLAYING') {
      return this.gameEndMessage;
    }

    const player = this.getPlayerBySymbol(this.turn);

    return `${player?.name}'s turn`;
  }

  get isComputerTurn(): boolean {
    return this.mode === 'ONE_PLAYER' && this.turn === this.player2.symbol;
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
    this.mode = mode;

    if (this.mode === 'TWO_PLAYER') {
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

  firstGame(playerOneSymbol: PlayerSymbol): void {
    if (!this.player1 || !this.player2) {
      return;
    }

    this.player1.symbol = playerOneSymbol;
    this.player2.symbol =
      PLAYER_SYMBOLS.find((x) => x !== playerOneSymbol) || EMPTY_STRING;

    this.turn = this.whoStarts();
    this.play();
  }

  // eslint-disable-next-line class-methods-use-this
  whoStarts(): PlayerSymbol {
    const rand = Math.floor(Math.random() * 2 + 1);
    return rand === 1 ? 'X' : 'O';
  }

  selectComputerAI(name: ComputerAgent): void {
    this.player2.name = name;
    this.toGameStarter();
  }

  playerTurn(position: { x: number; y: number }): void {
    const { x, y } = position;
    if (
      this.board.cells[x][y].value === EMPTY_CELL &&
      this.phrase === 'PLAYING' &&
      !this.isComputerTurn
    ) {
      const symbol = this.turn;

      this.board.cells[x][y].setValue(symbol);
      this.endTurn();
    }
  }

  getPlayerBySymbol(symbol: PlayerSymbol): Player | null {
    if (this.player1?.symbol === symbol) {
      return this.player1;
    }

    return this.player2;
  }

  play(): void {
    this.phrase = 'PLAYING';
    setTimeout(() => {
      if (this.isComputerTurn) {
        this.computerTurn();
        this.endTurn();
      }
    }, 0);
  }

  endTurn(): void {
    if (this.phrase !== 'PLAYING') {
      return;
    }

    const winnerSymbol = this.board.checkWin();
    const winner = winnerSymbol ? this.getPlayerBySymbol(winnerSymbol) : null;
    if (winner) {
      this.phrase = 'END';
      this.winner = winner;
      this.winner.score += 1;
      return;
    }

    if (!this.board.isMovesLeft()) {
      this.phrase = 'END';
      return;
    }

    this.turn = this.nextTurn();
    setTimeout(() => {
      if (this.isComputerTurn) {
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

  computerTurn(): void {
    let nextMove: Cell | null = null;
    nextMove = this.player2.findBestMove(this.board);
    if (!nextMove) {
      return;
    }
    this.board.cells[nextMove.x][nextMove.y].setValue(
      this.player2?.symbol || '',
    );
  }

  resetGame(): void {
    if (!this.player1 || !this.player2) return;
    this.player1.score = 0;
    this.player2.score = 0;
    this.board.initialize();
    this.phrase = 'GAME_CHOICE';
    this.turn = this.whoStarts();
  }

  reset(): void {
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
