<template>
  <article id="game-display">
    <template v-if="gameOn">
      <section id="player-icon">
        <div v-if="playerSelection == 0">
          <font-awesome-icon icon="hand-rock" />
        </div>
        <div v-else-if="playerSelection == 1">
          <font-awesome-icon icon="hand-scissors" rotation="90" />
        </div>
        <div v-else-if="playerSelection == 2">
          <font-awesome-icon icon="hand-paper" />
        </div>
        <h1 class="player-label">Player</h1>
      </section>

      <section id="comparison">
        <div v-if="gameResult == -1">
          <font-awesome-icon icon="angle-left" />
        </div>
        <div v-else-if="gameResult == 1">
          <font-awesome-icon icon="angle-right" />
        </div>
        <div v-else-if="gameResult == 0">
          <p>&equals;</p>
        </div>
      </section>

      <section id="computer-icon">
        <div v-if="computerSelection == 0">
          <font-awesome-icon icon="hand-rock" />
        </div>
        <div v-else-if="computerSelection == 1">
          <font-awesome-icon icon="hand-scissors" rotation="90" />
        </div>
        <div v-else-if="computerSelection == 2">
          <font-awesome-icon icon="hand-paper" />
        </div>
        <h1 class="player-label">CPU</h1>
      </section>

      <section id="game-result">
        <div v-if="gameResult == -1">
          <p>You lose!</p>
        </div>
        <div v-else-if="gameResult == 1">
          <p>You win!</p>
        </div>
        <div v-else-if="gameResult == 0">
          <p>It's a tie!</p>
        </div>
      </section>
    </template>
  </article>
</template>

<script>
export default {
  name: "game-display",

  props: ["playerSelection", "computerSelection", "gameResult", "gameOn"],
};
</script>

<style lang="scss" scoped>
#game-display {
  display: grid;
  gap: 1rem;
  place-items: center;
  grid-auto-columns: 1fr auto 1fr;
  grid-auto-rows: 1fr auto;
  font-size: 4rem;

  section {
    display: grid;
    place-items: center;
  }

  .player-label {
    font-size: 2rem;
    color: black;
  }

  #player-icon {
    grid-column: 1;
    grid-row: 1;
    border: solid 1px black;
    padding: 1rem;
    border-radius: 10px;
  }
  #comparison {
    grid-column: 2;
    grid-row: 1;
  }
  #computer-icon {
    grid-column: 3;
    grid-row: 1;
  }
  #game-result {
    grid-column: 1 / 4;
    grid-row: 2;
    font-size: 2rem;
  }
}
</style>
