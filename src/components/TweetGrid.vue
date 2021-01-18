<template>
  <section class="tweet-grid">
    <tweet
      v-for="(tweet, id) in tweets"
      :key="id"
      class="tweet"
      :tweetId="tweet.tweetId"
    >
      {{ tweet.content }}
    </tweet>
  </section>
</template>

<script>
import Tweet from "../components/Tweet.vue";

export default {
  name: "tweet-grid",
  props: {
    tweets: {
      type: Array,
    },
  },
  components: {
    Tweet,
  },
};
</script>

<style lang="scss" scoped>
.tweet-grid {
  padding: 1rem;
  place-self: stretch;
  grid-row: 2;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-template-rows: auto;
  gap: 2rem;
  place-items: stretch;

  .tweet {
    border: solid 1px black;
    min-height: 10rem;
  }
}
</style>
