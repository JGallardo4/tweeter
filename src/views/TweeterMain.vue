<template>
  <body>
    <tweeter-header></tweeter-header>
    <main></main>
  </body>
</template>

<script>
import TweeterHeader from "../components/TweeterHeader.vue";
export default {
  name: "tweeter-main",

  components: {
    TweeterHeader,
  },

  beforeCreate() {
    this.$store.dispatch("checkLogin");
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

@media screen and (min-width: 769px) {
  //
}
</style>
