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
          :board="game?.board.cells"
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
  GameMode,
} from '@/models/gomoku/types.d';
import { PLAYER_SYMBOLS } from '@/models/gomoku/constants';
// eslint-disable-next-line no-unused-vars
import Game from '@/models/gomoku/Game';
import Player, { ComputerPlayer } from '@/models/gomoku/Player';

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
    text: 'Novice',
    value: 'novice',
  },
  {
    text: 'Medium',
    value: 'medium',
  },
  {
    text: 'Expert',
    value: 'expert',
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
  phrase: GamePhrase = 'GAME_CHOICE';

  mode: GameMode = 'ONE_PLAYER';

  ai: string = 'novice';

  game: Game | null = null;

  initializeGame(): void {
    if (!this.game) {
      return;
    }

    this.game.board.initialize();
    this.game.player1.reset();
    this.game.player2.reset();
    this.game.winner = null;
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
            text: this.game?.player1?.name || '',
            value: this.game?.player1?.score || 0,
          },
          {
            text: this.game?.player2?.name || '',
            value: this.game?.player2?.score || 0,
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
    if (this.phrase !== 'PLAYING' || this.game?.playing) {
      return EMPTY_STRING;
    }

    if (!this.game?.winner) {
      return 'It was a draw..';
    }

    if (this.mode === 'TWO_PLAYER') {
      return `${this.game.winner.name} wins!! :D `;
    }

    if (this.game.winner === this.game.player2) {
      return 'Uh oh, you lost..';
    }

    return 'You Won!!!';
  }

  get turnStatus(): string {
    if (this.phrase !== 'PLAYING') {
      return this.gameEndMessage;
    }

    const player = this.game?.getPlayerBySymbol(this.game.turn);

    return `${player?.name}'s turn`;
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
    this.toGameStarter();
    if (this.mode === 'TWO_PLAYER') {
      this.toGameStarter();
      return;
    }

    this.toSelectComputer();
  }

  toGameStarter() {
    this.phrase = 'GAME_STARTER';
  }

  toGameChoice() {
    this.phrase = 'GAME_CHOICE';
  }

  toSelectComputer() {
    this.phrase = 'GAME_SELECT_COM';
  }

  selectComputerAI(ai: string): void {
    this.ai = ai;
    this.toGameStarter();
  }


  firstGame(playerOneSymbol: PlayerSymbol): void {
    const playerTwoSymbol =
      PLAYER_SYMBOLS.find((x) => x !== playerOneSymbol) || 'X';

    this.game =
      this.mode === 'TWO_PLAYER'
        ? new Game(
            new Player('Player 1', playerOneSymbol),
            new Player('Player 2', playerTwoSymbol),
          )
        : new Game(
            new Player('Player 1', playerOneSymbol),
            new ComputerPlayer('Computer', playerTwoSymbol, this.ai),
          );

    this.phrase = 'PLAYING';
    this.game.start();
  }

  playerTurn(position: { r: number; c: number }): void {
    if (!this.game) {
      return;
    }
    this.game.playerTurn(position);
  }

  resetGame(): void {
    if (!this.game || !this.game.player1 || !this.game.player2) {
      return;
    }

    this.game.player1.hardReset();
    this.game.player2.hardReset();
    this.game.board.initialize();
    this.phrase = 'GAME_CHOICE';
  }

  reset(): void {
    if (!this.game) {
      return;
    }

    this.initializeGame();
    this.game.start();
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
