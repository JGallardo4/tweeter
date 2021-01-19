<template>
  <article class="tweet">
    <button
      v-if="userId == tweet.userId"
      @click="deleteTweet()"
      id="delete-button"
    >
      <div id="delete-icon"><font-awesome-icon icon="times" /></div>
    </button>

    <p id="tweet-content">{{ tweet.content }}</p>

    <section id="tweet-info">
      <button
        v-if="tweet.userId != userId"
        @click="followUser()"
        id="follow-button"
      >
        <!-- <div id="tweeter-icon">
          <font-awesome-icon icon="crow" />
        </div> -->
        <p>Follow user</p>
      </button>
      <p id="tweet-author">{{ tweet.username }}</p>
      <p id="tweet-date">{{ tweet.createdAt }}</p>
    </section>
  </article>
</template>

<script>
export default {
  name: "Tweet",

  props: {
    tweet: {
      type: Object,
    },
  },

  computed: {
    loginToken() {
      return this.$store.getters.getLoginToken;
    },
    userId() {
      return this.$store.getters.getUserId;
    },
  },

  methods: {
    deleteTweet() {
      this.$store.dispatch("deleteTweet", {
        loginToken: this.loginToken,
        tweetId: this.tweet.tweetId,
      });

      this.$store.dispatch("refreshTweets");
    },

    followUser() {
      this.$store.dispatch("followUser", this.tweet.userId);
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
  grid-template-rows: auto 1fr auto;

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

  #tweet-info {
    grid-column: 1 / 3;
    grid-row: 3;
    display: flex;
    justify-content: right;
    gap: 1rem;
    padding: 1rem;
  }
}
</style>
