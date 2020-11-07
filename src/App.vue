<template>
  <h1>Gomoku Game</h1>
  <Game />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import Game from './components/Game.vue';

@Options({
  // Specify `components` option.
  // See Vue.js docs for all available options:
  // https://vuejs.org/v2/api/#Options-Data
  components: {
    Game,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: monospace;
  font-size: large;
  text-align: center;
}
</style>
