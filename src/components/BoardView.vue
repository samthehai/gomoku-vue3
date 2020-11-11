<template>
  <div class="board" ref="boardElement">
    <div
      v-if="gameEndMessage"
      class="board__game-end-message"
      @click="$emit('click-reset')"
    >
      <p>{{ gameEndMessage }}</p>
    </div>
    <template v-for="(row, rowIndex) in board">
      <div
        v-for="(cell, cellIndex) in row"
        v-bind:key="rowIndex + '_' + cellIndex"
        class="board__cell"
        @click="$emit('click-cell', { x: rowIndex, y: cellIndex })"
      >
        {{ cell }}
      </div>
    </template>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line no-unused-vars
import { PropOptions } from 'vue-class-component';
import { ref, onMounted } from 'vue';

interface Data {
  [key: string]: unknown;
}

export default {
  props: {
    board: {
      type: Array,
      required: true,
    } as PropOptions<string[][]>,
    gameEndMessage: {
      type: String,
      default: '',
    } as PropOptions<string>,
  },
  setup(props: Data): Data {
    const boardElement = ref(null);

    onMounted(() => {
      (boardElement.value as any).style.setProperty(
        '--cell-number',
        (props.board as string[][]).length,
      );
    });

    return {
      boardElement,
    };
  },
};
</script>

<style lang="scss" scoped>
.board {
  --cell-number: 8; /* default value will be replace in JS */
  --cell-width: calc(80vw / var(--cell-number));

  display: grid;
  grid-gap: 0;
  grid-template-columns: repeat(var(--cell-number), [col] var(--cell-width));
  grid-template-rows: repeat(var(--cell-number), [row] var(--cell-width));
  width: calc(var(--cell-number) * var(--cell-width));
  box-shadow: 0 5px 8px #777;
  justify-content: center;
  align-content: center;
  margin: 0 auto;

  &__cell {
    display: block;
    text-align: center;
    font-family: 'Architects Daughter', 'Helvetica', 'sans-serif';
    color: rgba(0, 0, 0, 0.5);
    border: 0.1px solid rgb(207, 218, 218);
    z-index: 500;
    line-height: 1;
    font-size: calc(4vw);
  }

  &__game-end-message {
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

    p {
      color: white;
      text-align: center;
      position: absolute;
      font-size: 2.3rem;
      margin: 0;
      font-family: monospace;
    }
  }
}
</style>
