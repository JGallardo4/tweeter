<template>
  <body>
    <header>
      <button id="logout-button" @click="logOut()">Logout</button>
    </header>
    <main></main>
  </body>
</template>

<script>
export default {
  name: "tweeter-main",

  beforeCreate() {
    this.$store.dispatch("checkLogin");
  },

  methods: {
    logOut() {
      this.$store.dispatch("logOut");
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin formReset() {
  input {
    font-size: inherit;
    font-size: calc(max(16px, 1em));
    font-family: inherit;
    padding: 0.25em 0.5em;
    background-color: #fff;
    border: 1px solid black;
    border-radius: 5px;
  }
  legend {
    padding: 0 0.5rem;
  }
}

@mixin resetButton() {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}

@include formReset;

header {
  display: flex;
  justify-content: right;
  padding: 1rem;
  #logout-button {
    @include resetButton;
    border: 1px solid black;
    background-color: black;
    color: white;
    font-weight: bold;
    border-radius: 10px;
    padding: 1rem;
    &:hover {
      background-color: white;
      color: black;
    }
  }
}

#game {
  padding: 1rem;
  gap: 1rem;
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-rows: auto 1fr;
  #player-selection {
    grid-column: 1;
    grid-row: 2;
  }
  #rules-graph {
    grid-column: 1;
    grid-row: 1;
    justify-self: right;
    margin: 2rem;
    margin-top: 3rem;
    margin-right: 3rem;
  }
  #game-display {
    grid-column: 1;
    grid-row: 3;
  }
}

@media screen and (min-width: 769px) {
  //
}
</style>
