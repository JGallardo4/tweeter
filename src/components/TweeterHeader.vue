<template>
  <header>
    <router-link to="/"><p id="site-title">Tweeter</p></router-link>
    <section v-if="isLoggedIn" id="user-menu">
      <router-link to="/" id="user-icon">
        <font-awesome-icon icon="user" />
      </router-link>
      <button id="logout-button" @click="logOut()">Logout</button>
    </section>
  </header>
</template>

<script>
export default {
  name: "tweeter-header",

  computed: {
    isLoggedIn() {
      return this.$store.state.isAuthenticated;
    },
  },

  methods: {
    logOut() {
      this.$store.dispatch("logOut");
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

header {
  display: flex;
  justify-content: space-between;
  #site-title {
    display: grid;
    align-items: center;
    height: 100%;
    padding: 1rem;
  }
  #user-menu {
    display: flex;
    justify-content: right;
    padding: 1rem;
    #user-icon {
      padding: 1rem;
    }
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
}
</style>
