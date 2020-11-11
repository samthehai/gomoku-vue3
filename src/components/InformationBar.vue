<template>
  <div class="information-bar">
    <div class="information-bar__infos infos">
      <div
        v-for="(item, index) in infos"
        v-bind:key="index"
        class="infos__item"
      >
        <div class="infos__item-header">{{ item.text }}</div>
        <div class="infos__child">
          <div
            v-for="(childItem, childIndex) in item.lists"
            v-bind:key="childIndex"
            class="infos__child-item"
          >
            <span class="infos__child-label">{{ childItem.text }}</span
            > <span>{{ childItem.value }}</span>
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
  margin: 0 10vw;
  font-family: monospace;
  font-size: calc(3vw);

  &__infos {
  }

  &__control-section {
    display: flex;
    align-items: flex-end;
    margin-left: auto;
    font-weight: bold;

    .button:hover,
    :active {
      background-color: gray;
    }
  }
}

.infos {
  &__item-header {
    font-weight: bold;
  }

  &__child {
    display: flex;
  }

  &__child-label {
    font-weight: bold;
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
}
</style>
