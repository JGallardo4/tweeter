<template>
  <article id="comments">
    <section id="post-comment">
      <form id="post-comment__form" action="" @submit.prevent="postComment()">
        <fieldset id="post-comment__fieldset">
          <legend>New Comment</legend>

          <p id="comment-content">
            <textarea
              rows="5"
              cols="40"
              name="tweet-content"
              v-model="input"
            ></textarea>
          </p>

          <p id="character-count" :class="{ overLimit: isOverLimit }">
            {{ totalCharacters }} / {{ characterLimitInclusive }} characters
          </p>

          <button
            :disabled="isOverLimit"
            :class="{ disabled: isOverLimit }"
            type="submit"
            id="submit-comment"
          >
            Post New Comment
          </button>
        </fieldset>
      </form>
    </section>
    <section id="comments-list">
      <tweet-comment
        v-for="(comment, id) in comments"
        :key="id"
        :comment="comment"
      ></tweet-comment>
    </section>
  </article>
</template>

<script>
import TweetComment from "../components/TweetComment.vue";
export default {
  name: "tweeter-comments",

  props: {
    tweetId: {
      type: Number,
    },
  },

  data: function() {
    return {
      input: "",
      comments: [],
      characterLimitInclusive: 150,
    };
  },

  components: {
    TweetComment,
  },

  mounted() {
    this.refreshComments();
  },

  computed: {
    totalCharacters() {
      return this.input.length;
    },

    isOverLimit() {
      return this.input.length > this.characterLimitInclusive;
    },
  },

  methods: {
    refreshComments() {
      this.$axios
        .request({
          url: "/comments",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "1Rj5dMCW6aOfA75kbtKt6Gcatc5M9Chc6IGwJKe4YdhDD",
          },
          params: { tweetId: this.tweetId },
        })
        .then((response) => {
          if (response.status === 200) {
            this.comments = response.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    postComment() {
      this.$axios
        .request({
          url: "/comments",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "1Rj5dMCW6aOfA75kbtKt6Gcatc5M9Chc6IGwJKe4YdhDD",
          },
          data: {
            loginToken: this.$store.getters.getLoginToken,
            tweetId: this.tweetId,
            content: this.input,
          },
        })
        .then((response) => {
          if (response.status === 201) {
            this.refreshComments();
          }
        })
        .catch((error) => {
          console.log(error);
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

@mixin formReset() {
  legend {
    padding: 0 0.5rem;
  }
  input {
    font-size: 16px;
    font-size: calc(max(16px, 1em));
    font-family: inherit;
    padding: 0.25em 0.5em;
    background-color: #fff;
    border: 1px solid black;
    border-radius: 5px;
    width: 100%;

    &:not(textarea) {
      line-height: 1;
      height: 2.25rem;
    }
  }
}
@include formReset;
#post-comment {
  padding: 0.5rem;
  #post-comment__fieldset {
    padding: 0.5rem;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    gap: 1rem;

    #comment-content {
      textarea {
        width: 100%;
        max-width: 100%;
      }
    }

    #character-count {
      justify-self: right;
      &.overLimit {
        color: red;
      }
    }

    #submit-comment {
      @include resetButton;
      border: 1px solid black;
      background-color: black;
      color: white;
      font-weight: bold;
      border-radius: 10px;
      place-self: center;
      padding: 1rem 1.5rem;
      &:hover {
        background-color: white;
        color: black;
      }
      &.disabled {
        background-color: gray;
        color: black;
        cursor: not-allowed;
      }
    }
  }
}

#comments-list {
  .comment {
    padding: 0.5rem;
    border-top: dashed 1px black;
  }
}
</style>
