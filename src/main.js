import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import axios from "axios";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
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

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

const store = new Vuex.Store({
  state: {
    isAuthenticated: false,
    userId: "",
    userName: "",
  },

  getters: {
    getIsAuthenticated(state) {
      return state.isAuthenticated;
    },
    getUserName(state) {
      return state.userName;
    },
  },

  mutations: {
    SET_AUTHENTICATED(state, payload) {
      state.isAuthenticated = payload;
    },

    SET_USERID(state, payload) {
      state.userId = payload;
    },

    SET_USERNAME(state, payload) {
      state.userName = payload;
    },

    DELETE_USERDATA(state) {
      state.isAuthenticated = false;
      state.userId = "";
      state.userName = "";
    },
  },

  actions: {
    logIn({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post("https://tweeterest.ml/api/login", payload)
          .then((response) => {
            if (response.status === 201) {
              commit("SET_AUTHENTICATED", true);
              commit("SET_USERID", response.data.userId);
              commit("SET_USERNAME", response.data.username);
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
      commit("DELETE_USERDATA");
      redirect("/login");
    },

    checkLogin({ dispatch }) {
      if (this.getters.getIsAuthenticated) {
        redirect("/");
      } else {
        console.log(router.currentRoute);
        if (router.currentRoute != "/login") {
          dispatch("logOut");
        }
      }
    },

    register({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post("https://tweeterest.ml/api/users", payload)
          .then((response) => {
            if (response.status === 201) {
              commit("SET_AUTHENTICATED", true);
              commit("SET_USERID", response.data.userId);
              commit("SET_USERNAME", response.data.username);
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

    initializeStore({ state }) {
      if (window.localStorage.getItem("vuex")) {
        this.replaceState(
          Object.assign(state, JSON.parse(window.localStorage.getItem("state")))
        );
      }
    },
  },

  plugins: [vuexLocal.plugin],
});

/* eslint-disable-next-line */
window.vm = new Vue({
  router: router,
  axios: axios,
  store: store,
  cookies: cookies,
  render: (h) => h(App),
}).$mount("#app");
