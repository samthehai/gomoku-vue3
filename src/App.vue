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
  max-width: 600px;
  margin: 0 auto;
  height: 100%;
  box-shadow: inset -1px 1px 7px rgba(0, 0, 0, 0.2),
    inset 1px -1px 1px rgba(0, 0, 0, 0.2), 1px 1px 1px rgba(0, 0, 0, 0.4),
    1px 1px 1px rgba(0, 0, 0, 0.4), 1px 1px 1px rgba(0, 0, 0, 0.2),
    -1px 1px 1px rgba(0, 0, 0, 0.1);

  &__content {
    // max-width: 600px;
    margin: 20px auto 0;
    height: 100%;

    @media screen and (max-width: 600px) {
      margin-left: 10vw;
      margin-right: 10vw;
    }
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
  font-family: monospace;
  font-size: 1.5rem;

  box-shadow: inset -1px 1px 7px rgba(0, 0, 0, 0.2),
    inset 1px -1px 1px rgba(0, 0, 0, 0.2), 1px 1px 1px rgba(0, 0, 0, 0.4),
    1px 1px 1px rgba(0, 0, 0, 0.4), 1px 1px 1px rgba(0, 0, 0, 0.2),
    -1px 1px 1px rgba(0, 0, 0, 0.1);

  div {
    &:nth-child(n + 2) {
      padding-left: 5px;
    }
    color: black;
  }

  a {
    width: 100%;
    font-weight: bold;
    border: solid 1px gray;
    border-radius: 10px;
    text-decoration: none;
    padding: 0 10px;
    color: black;
    background-color: white;
    &.router-link-exact-active {
      color: white;
      background: rgb(208, 207, 226);
      background: linear-gradient(
        90deg,
        rgb(208, 207, 226) 0%,
        rgba(171, 198, 193, 1) 35%,
        rgba(0, 212, 255, 1) 100%
      );
    }
    cursor: pointer;
    line-height: 1.5;
  }
}
</style>
