<template>
  <section id="debug">
    <button @click="refresh()" id="refresh-button">
      Refresh
    </button>
    <!-- <p v-for="(user, id) in users" :key="id"></p> -->
  </section>
</template>

<script>
export default {
  name: "debug",

  methods: {
    refresh() {
      this.$store
        .dispatch("getUsers")
        .then((response) => console.log(response));
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

#discover {
  grid-template-rows: auto 1fr;
  #refresh-button {
    justify-self: right;
    @include resetButton;
    padding: 1rem;
    border-left: solid 1px black;
    border-bottom: solid 1px black;

    &:hover {
      background-color: lightgreen;
    }
  }
}
</style>
