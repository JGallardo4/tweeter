<template>
  <body>
    <header>
      <button id="logout-button" @click="logOut()">Logout</button>
    </header>
    <main>
      <navbar></navbar>
      <article id="game">
        <rules-graph id="rules-graph"></rules-graph>

        <div id="player-selection">
          <form action="" id="player-selection__form">
            <fieldset id="player-selection__fieldset">
              <legend>Select</legend>
              <section id="radio-buttons">
                <label>
                  <input
                    type="radio"
                    value="0"
                    :disabled="gameOn"
                    v-model.number="playerSelection"
                  />
                  <span>Rock</span>
                </label>
                <label>
                  <input
                    type="radio"
                    value="2"
                    :disabled="gameOn"
                    v-model.number="playerSelection"
                  />
                  <span>Paper</span>
                </label>
                <label>
                  <input
                    type="radio"
                    value="1"
                    :disabled="gameOn"
                    v-model.number="playerSelection"
                  />
                  <span>Scissors</span>
                </label>
              </section>

              <p v-if="error">Please make a selection</p>

              <button @click.prevent="play()" id="play-button" v-if="!gameOn">
                <p>Play</p>
              </button>

              <button
                @click.prevent="reset()"
                id="play-button"
                v-else-if="gameOn"
              >
                <p>Play Again</p>
              </button>
            </fieldset>
          </form>
        </div>

        <game-display
          id="game-display"
          :playerSelection="playerSelection"
          :computerSelection="computerSelection"
          :gameResult="gameResult"
          :gameOn="gameOn"
        ></game-display>
      </article>
    </main>
  </body>
</template>

<script>
import RulesGraph from "../components/RulesGraph.vue";
import GameDisplay from "../components/GameDisplay.vue";
import Navbar from "../components/Navbar.vue";

export default {
  components: { RulesGraph, GameDisplay, Navbar },

  name: "rock-paper-scissors",

  data: function() {
    return {
      playerSelection: -1,
      computerSelection: -1,
      gameOn: false,
      error: false,
    };
  },

  computed: {
    gameResult() {
      var result = -2;

      if (this.playerSelection == -1 && this.computerSelection == -1) return -2;

      if (this.playerSelection == this.computerSelection) return 0;

      switch (this.playerSelection) {
        case 0:
          this.computerSelection == 1 ? (result = 1) : (result = -1);
          break;
        case 1:
          this.computerSelection == 2 ? (result = 1) : (result = -1);
          break;
        case 2:
          this.computerSelection == 0 ? (result = 1) : (result = -1);
          break;
        default:
          result = -2;
      }

      return result;
    },
  },

  beforeCreate() {
    this.$store.dispatch("checkLogin");
  },

  methods: {
    reset() {
      this.gameOn = false;
      this.playerSelection = -1;
      this.computerSelection = -1;
    },

    play() {
      if (this.playerSelection == -1) {
        this.error = true;
        return;
      } else {
        this.error = false;
      }

      this.computerSelection = this.getRandomInt(0, 3);
      this.gameOn = true;

      this.endGame(this.gameResult);
    },

    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      //The maximum is exclusive and the minimum is inclusive
      return Math.floor(Math.random() * (max - min) + min);
    },

    logOut() {
      this.$store.dispatch("logOut");
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin formReset() {
  input {
    font-size: inherit;
    font-size: calc(max(16px, 1em));
    font-family: inherit;
    padding: 0.25em 0.5em;
    background-color: #fff;
    border: 1px solid black;
    border-radius: 5px;
  }
  legend {
    padding: 0 0.5rem;
  }
}

@mixin resetButton() {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}

@include formReset;

header {
  display: flex;
  justify-content: right;
  padding: 1rem;
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

#game {
  padding: 1rem;
  gap: 1rem;
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-rows: auto 1fr;
  #player-selection {
    grid-column: 1;
    grid-row: 2;
  }
  #rules-graph {
    grid-column: 1;
    grid-row: 1;
    justify-self: right;
    margin: 2rem;
    margin-top: 3rem;
    margin-right: 3rem;
  }
  #game-display {
    grid-column: 1;
    grid-row: 3;
  }
}

#player-selection {
  height: auto;
  #player-selection__fieldset {
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    gap: 1rem;
    #radio-buttons {
      grid-row: 1;
      display: flex;
      justify-content: space-between;

      input {
        margin-right: 0.5rem;
      }

      label {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
      }
    }
    #play-button {
      grid-row: 2;
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
    }
  }
}

@media screen and (min-width: 769px) {
  #game {
    grid-auto-columns: 1fr 1fr;
    grid-template-rows: auto 1fr;
    #player-selection {
      grid-column: 1;
      grid-row: 1;
    }
    #rules-graph {
      grid-column: 2;
      grid-row: 1 / 3;
    }
    #game-display {
      grid-column: 1 / 3;
    }
  }
}
</style>
