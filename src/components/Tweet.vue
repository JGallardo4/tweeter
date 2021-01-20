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
      <form @submit.prevent="toggleFollow()">
        <button
          v-if="tweet.userId != userId"
          type="submit"
          id="follow-button"
          title="Follow this user"
        >
          <div id="follow-icon">
            <font-awesome-icon
              :icon="isFollowed ? 'user-times' : 'user-plus'"
            />
          </div>
        </button>
      </form>

      <form @submit.prevent="toggleLikeTweet()">
        <button
          v-if="userId != tweet.userId"
          type="submit"
          id="like-button"
          title="Like this tweet"
        >
          <div id="like-icon">
            <font-awesome-icon
              icon="heart"
              :class="['like-icon', { liked: isLiked }]"
            />
            <span id="likes-counter">{{ numberOfLikes }}</span>
          </div>
        </button>
      </form>

      <p id="tweet-author">{{ tweet.username }}</p>
      <p id="tweet-date">{{ tweet.createdAt }}</p>
    </section>
  </article>
</template>

<script>
export default {
  name: "Tweet",

  data: function() {
    return { likedBy: [] };
  },

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
    isFollowed() {
      return this.$store.getters.getFollows.includes(this.tweet.userId);
    },
    isLiked() {
      return this.likedBy.includes(this.$store.getters.getUserId);
    },
    numberOfLikes() {
      return this.likedBy.length;
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

    toggleFollow() {
      this.isFollowed
        ? this.$store.dispatch("unfollowUser", {
            loginToken: this.loginToken,
            followId: this.tweet.userId,
          })
        : this.$store.dispatch("followUser", {
            loginToken: this.loginToken,
            followId: this.tweet.userId,
          });
    },

    toggleLikeTweet() {
      this.isLiked
        ? this.$store.dispatch("unlikeTweet", {
            loginToken: this.loginToken,
            tweetId: this.tweet.tweetId,
          })
        : this.$store.dispatch("likeTweet", {
            loginToken: this.loginToken,
            tweetId: this.tweet.tweetId,
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

  #like-icon {
    .liked {
      color: rgb(214, 76, 99);
    }
    #likes-counter {
      padding-left: 1rem;
    }
  }
}
</style>
