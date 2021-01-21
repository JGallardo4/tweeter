<template>
  <article class="comment">
    <button
      v-if="userId == comment.userId"
      @click="deleteComment()"
      id="delete-button"
    >
      <div id="delete-icon"><font-awesome-icon icon="times" /></div>
    </button>

    <p id="comment-content">{{ comment.content }}</p>

    <section id="comment-info">
      <button
        v-if="userId == comment.userId"
        @click.prevent="() => (isEdit = !isEdit)"
        id="edit-button"
        title="Edit this Comment"
      >
        <div id="edit-icon">
          <font-awesome-icon icon="pen" />
        </div>
      </button>
      <p id="comment-author">{{ comment.username }}</p>
      <p id="comment-date">{{ comment.createdAt }}</p>
    </section>

    <section v-if="isEdit" id="edit-comment">
      <p>hello world</p>
    </section>
  </article>
</template>

<script>
export default {
  name: "tweet-comment",

  data: function() {
    return {
      isEdit: false,
    };
  },

  computed: {
    userId() {
      return this.$store.getters.getUserId;
    },
  },

  props: {
    comment: {
      type: Object,
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

.comment {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 3rem 8rem 3rem auto;
  height: min-content;

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
    place-self: center;
  }

  #tweet-info {
    grid-column: 1 / 3;
    grid-row: 3;
    display: flex;
    justify-content: right;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
  }

  #like-icon {
    .liked {
      color: rgb(214, 76, 99);
    }
  }

  #follow-icon {
    .followed {
      color: rgb(79, 165, 79);
      &:hover {
        color: rgb(214, 76, 99);
      }
    }
  }

  #like-button,
  #follow-button,
  #comment-button {
    @include resetButton;
  }

  #comments-counter,
  #likes-counter {
    padding-left: 0.4rem;
  }

  #edit-button {
    @include resetButton;
  }

  #comments {
    grid-row: 4;
  }
}
</style>
