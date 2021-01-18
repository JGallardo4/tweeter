<template>
  <article class="tweet">
    <button @click="deleteTweet()" id="delete-button">
      <div id="delete-icon"><font-awesome-icon icon="times" /></div>
    </button>

    <p id="tweet-content"><slot></slot></p>
  </article>
</template>

<script>
export default {
  name: "Tweet",

  props: {
    tweetId: {
      type: Number,
    },
  },

  computed: {
    loginToken() {
      return this.$store.getters.getLoginToken;
    },
  },

  methods: {
    deleteTweet() {
      console.log(this.loginToken);
      console.log(this.tweetId);
      this.$store.dispatch("deleteTweet", {
        loginToken: this.loginToken,
        tweetId: this.tweetId,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin resetButton() {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}

.tweet {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto 1fr;

  #delete-button {
    grid-column: 2;
    grid-row: 1;
    @include resetButton;
    padding: 1rem;

    &:hover {
      background-color: lightpink;
    }
  }
  #tweet-content {
    grid-column: 1 / 3;
    grid-row: 2;
    padding: 1rem;
  }
}
</style>
