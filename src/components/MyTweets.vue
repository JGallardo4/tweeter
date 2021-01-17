<template>
  <section id="my-tweets">
    <button @click="refresh()" id="refresh-button">
      Refresh
    </button>

    <article v-for="tweet in tweets" :key="tweet">
      {{ tweet.content }}
    </article>
  </section>
</template>

<script>
export default {
  name: "my-tweets",

  computed: {
    tweets() {
      return this.$store.getters.getUserTweets;
    },
  },

  methods: {
    refresh() {
      console.log(this.tweets);
    },
  },
};
</script>

<style lang="scss" scoped></style>
