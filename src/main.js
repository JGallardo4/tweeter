import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import axios from "axios";
import Vuex from "vuex";
import cookies from "vue-cookies";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUser);

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
    user: "",
  },

  getters: {
    getIsAuthenticated(state) {
      return state.isAuthenticated;
    },
  },

  mutations: {
    LOG_IN(state) {
      state.isAuthenticated = true;
    },
    LOG_OUT(state) {
      cookies.set("loginToken", "");
      state.isAuthenticated = false;
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
              commit("LOG_IN");
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
      console.log(cookies.get("loginToken"));
      redirect("login");
    },

    checkLogin({ commit, dispatch }) {
      if (cookies.get("loginToken") != null) {
        commit("LOG_IN");
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
              commit("LOG_IN");
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
