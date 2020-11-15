<template>
  <div class="information-bar">
    <div class="information-bar__infos infos">
      <div
        v-for="(item, index) in infos"
        v-bind:key="index"
        class="infos__item"
      >
        <div v-if="item.text" class="infos__item-text">{{ item.text }}</div>
        <div v-if="item.lists" class="infos__child">
          <div
            v-for="(childItem, childIndex) in item.lists"
            v-bind:key="childIndex"
            class="infos__child-item"
          >
            <span class="infos__child-label">{{ childItem.text }}</span>
            <span class="infos__child-value">{{ childItem.value }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="information-bar__control-section">
      <div class="button" @click="$emit('click-hard-reset')">Reset All</div>
    </div>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line no-unused-vars
import { PropOptions } from 'vue-class-component';

type StatusItem = {
  text: string;
  value: string | number;
};

export type InformationBarData = {
  text: string;
  lists: StatusItem[];
};

export default {
  props: {
    infos: {
      type: Array,
      required: true,
    } as PropOptions<InformationBarData[]>,
  },
};
</script>

<style lang="scss" scoped>
.information-bar {
  display: flex;
  font-family: monospace;
  font-size: calc(min(3vw, 20px));

  &__control-section {
    display: flex;
    align-items: flex-end;
    margin-left: auto;
    font-weight: bold;

    .button {
      padding: 5px;
      background: rgb(208, 207, 226);
      background: linear-gradient(
        90deg,
        rgb(208, 207, 226) 0%,
        rgba(171, 198, 193, 1) 35%,
        rgba(0, 212, 255, 1) 100%
      );
      border-radius: 10px;

      outline: none;
      cursor: pointer;
    }

    .button:hover,
    :active {
      background-color: gray;
    }
  }
}

.infos {
  &__item-text {
    border-radius: 10px;
    background: rgb(208, 207, 226);
    background: linear-gradient(
      90deg,
      rgb(208, 207, 226) 0%,
      rgba(171, 198, 193, 1) 35%,
      rgba(0, 212, 255, 1) 100%
    );
  }

  &__child {
    display: flex;
  }

  &__child-label {
    &::after {
      content: ':';
    }
  }

  &__child-item {
    &:nth-child(n + 2) {
      padding-left: 5px;
      border: 0 solid gray;
      border-left-width: 0.1px;
    }
    &:not(:last-child) {
      padding-right: 5px;
    }
  }

  &__child-value {
    margin-left: 5px;
  }
}
</style>
