import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import axios from "axios";
import Vuex from "vuex";
import cookies from "vue-cookies";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import {
//   faHandRock,
//   faHandScissors,
//   faHandPaper,
//   faAngleRight,
//   faAngleLeft,
//   faInfo,
// } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// library.add(
//   faHandRock,
//   faHandScissors,
//   faHandPaper,
//   faAngleRight,
//   faAngleLeft,
//   faInfo
// );

Vue.component("font-awesome-icon", FontAwesomeIcon);

axios.defaults.headers.common["X-Api-Key"] =
  "1Rj5dMCW6aOfA75kbtKt6Gcatc5M9Chc6IGwJKe4YdhDD";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(Vuex);

var redirect = function(route) {
  if (router.currentRoute != route) {
    router.push(route).catch((error) => {
      if (
        error.name !== "NavigationDuplicated" &&
        !error.message.includes(
          "Avoided redundant navigation to current location"
        )
      ) {
        console.log(error);
      }
    });
  }
};

const store = new Vuex.Store({
  state: {
    isAuthenticated: true,
    loginToken: "",
  },

  getters: {
    getIsAuthenticated(state) {
      return state.isAuthenticated;
    },
  },

  mutations: {
    LOG_IN(state, payload) {
      state.isAuthenticated = true;
      state.loginToken = payload;
    },
    LOG_OUT(state) {
      state.isAuthenticated = false;
      state.loginToken = "";
    },
  },

  actions: {
    logIn({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post("https://tweeterest.ml/api/login", payload)
          .then((response) => {
            if (response.status === 201) {
              cookies.set("loginToken", response.data.loginToken, "1h");
              commit("LOG_IN", response.data.loginToken);
              redirect("/");
              resolve(response);
            } else {
              reject(response);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    logOut({ commit }) {
      commit("LOG_OUT");
      cookies.remove("loginToken");
      redirect("login");
    },

    checkLogin({ commit, dispatch }) {
      if (cookies.get("loginToken") == this.state.loginToken) {
        commit("LOG_IN", this.state.loginToken);
        redirect("/");
      } else {
        dispatch("logOut");
      }
    },

    register({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post("https://tweeterest.ml/api/users", payload)
          .then((response) => {
            if (response.status === 201) {
              cookies.set("loginToken", response.data.loginToken, "1h");
              commit("LOG_IN", response.data.loginToken);
              redirect("/");
              resolve(response);
            } else {
              reject(response);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});

new Vue({
  router: router,
  axios: axios,
  store: store,
  cookies: cookies,
  render: (h) => h(App),
}).$mount("#app");
