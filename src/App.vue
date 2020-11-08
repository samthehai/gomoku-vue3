<template>
  <div class="view">
    <div class="view__nav nav">
      <div>
        <router-link to="/">Home</router-link>
      </div>
      <div>
        <router-link to="/gomoku">Gomoku</router-link>
      </div>
    </div>
    <div class="view__content">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
.view {
  &__content {
    margin-top: 20px;
    width: 100%;
  }
}
.nav {
  display: flex;
  flex-direction: row;
  color: black;
  padding: 10px 0;
  overflow-x: scroll;
  border: solid 2px gray;
  border-left-width: 0;
  border-right-width: 0;

  div {
    &:nth-child(n + 2) {
      padding-left: 2px;
    }
    color: black;
  }

  a {
    width: 100%;
    font-weight: bold;
    border: solid 1px gray;
    border-radius: 5px;
    text-decoration: none;
    padding: 0 10px;
    color: black;
    background-color: white;
    &.router-link-exact-active {
      color: white;
      background-color: gray;
    }
    cursor: pointer;
  }
}
</style>
