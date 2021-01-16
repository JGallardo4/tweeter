<template>
  <body>
    <tweeter-header></tweeter-header>
    <main>
      <div id="register">
        <form action="" id="register__form">
          <fieldset id="register__fieldset">
            <legend>Register</legend>

            <p id="email-input">
              <label for="email">Email</label>
              <input
                type="text"
                name="email"
                v-model="input.email"
                placeholder=""
              />
            </p>

            <p id="username-input">
              <label for="username">Username</label>
              <input
                type="text"
                name="username"
                v-model="input.username"
                placeholder=""
              />
            </p>

            <p id="bio-input">
              <label for="bio">Bio</label>
              <input
                type="text"
                name="bio"
                v-model="input.bio"
                placeholder=""
              />
            </p>

            <p id="birthdate-input">
              <label for="birthdate">Birthdate</label>
              <input
                type="text"
                name="birthdate"
                v-model="input.birthdate"
                placeholder=""
              />
            </p>

            <p id="password-input">
              <label for="password">Password</label>
              <input
                type="password"
                name="password"
                v-model="input.password"
                placeholder=""
              />
            </p>

            <button @click.prevent="register()" id="submit-register">
              Register
            </button>

            <p id="error-message" v-if="error">
              There was an error with your email and/or password.
            </p>
          </fieldset>
          <router-link to="login">
            <p>Login</p>
          </router-link>
        </form>
      </div>
    </main>
  </body>
</template>

<script>
import TweeterHeader from "../components/TweeterHeader.vue";

export default {
  components: { TweeterHeader },
  name: "register",

  data() {
    return {
      input: {
        email: "",
        username: "",
        birthdate: "",
        bio: "",
        password: "",
      },

      error: false,
    };
  },

  watch: {
    "input.email": function() {
      this.error = false;
    },

    "input.password": function() {
      if (this.input.password != "") {
        this.error = false;
      }
    },
  },

  methods: {
    register() {
      this.$store.dispatch("register", this.input).finally((response) => {
        console.log(response);
        if (!response) {
          this.input.password = "";
          this.error = true;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$tablet-min: 769px;
$desktop-min: 1024px;
$widescreen-min: 1216px;
$fullhd-min: 1216px;

@mixin mobile-layout {
}

@mixin desktop-layout {
  width: 40vw;
  input {
    place-self: stretch;
  }
}

@media screen and (min-width: $desktop-min) {
  #register__form {
    @include desktop-layout;
  }
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

#register {
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: url("https://source.unsplash.com/random");
  background-size: cover;
  #register__form {
    padding: 0.5rem;
    border-radius: 10px;
    background-color: white;

    #register__fieldset {
      padding: 1rem;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr 1fr;
      gap: 1rem;
      border-radius: 10px;
      border-style: solid;
      border-width: 1px;
      border-color: black;

      fieldset {
        border: 0;
        display: grid;
      }

      input {
        padding: 1rem;
      }

      #submit-register {
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

      #error-message {
        color: darkred;
      }
    }
  }
}
</style>
