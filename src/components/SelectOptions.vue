<template>
  <div class="select-options">
    <p class="select-options__header">{{ title }}</p>
    <div class="select-options__list">
      <div
        v-for="(item, index) in options"
        v-bind:key="index"
        class="select-options__item"
        @click="$emit('click-item', item.value)"
      >
        {{ item.text }}
      </div>
    </div>
    <div
      v-if="backButton != 'none'"
      class="select-options__back-button"
      @click="$emit('click-back')"
    >
      <i class="fa fa-arrow-left"></i> Back
    </div>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line no-unused-vars
import { PropOptions } from 'vue-class-component';

export type ViewOption = {
  text: string;
  value: number | string | null;
};

const BACK_BUTTONS = ['none', 'display'];

export default {
  props: {
    title: {
      type: String,
      required: true,
    } as PropOptions<string>,
    options: {
      type: Array,
      required: true,
    } as PropOptions<ViewOption[]>,
    backButton: {
      type: String,
      default: 'none',
      validator: (value: string) => BACK_BUTTONS.includes(value),
    },
  },
};
</script>

<style lang="scss" scoped>
.select-options {
  color: rgb(40, 40, 40, 0.8);
  text-align: center;
  font-family: monospace;

  &__header {
    font-size: 2rem;
  }

  &__list {
    padding: 10px;
    font-size: 1.5rem;
  }

  &__item {
    outline: none;
    cursor: pointer;

    &:hover,
    &:active {
      background: rgb(208, 207, 226);
      background: linear-gradient(
        90deg,
        rgb(208, 207, 226) 0%,
        rgba(171, 198, 193, 1) 35%,
        rgba(0, 212, 255, 1) 100%
      );
    }
  }

  &__back-button {
    margin-top: 20px;
    font-size: 1rem;
    border-radius: 5px;
    // width: 60px;

    outline: none;
    cursor: pointer;

    &:hover,
    &:active {
      outline: none;
      background: rgb(208, 207, 226);
      background: linear-gradient(
        90deg,
        rgb(208, 207, 226) 0%,
        rgba(171, 198, 193, 1) 35%,
        rgba(0, 212, 255, 1) 100%
      );
    }

    &::before {
      content: '\22B2';
      padding: 0;
    }
  }
}
</style>
