<template>
  <header>
    <router-link to="/"><p id="site-title">Tweeter</p></router-link>
  </header>
</template>

<script>
export default {
  name: "tweeter-header",
};
</script>

<style lang="scss" scoped>
header {
  padding: 0.5rem;
  font-size: large;
}
</style>
