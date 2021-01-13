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

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isAuthenticated: true,
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
      state.isAuthenticated = false;
    },
  },

  actions: {
    logIn({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post("https://reqres.in/api/login", payload)
          .then((response) => {
            if (response.status == 200) {
              cookies.set("loginToken", response.data.token, "1h");
              commit("LOG_IN");
              if (router.currentRoute != "/") {
                router.push("/").catch((error) => {
                  // Ignore the vuex error regarding redundant navigation
                  if (
                    error.name !== "NavigationDuplicated" &&
                    !error.message.includes(
                      "Avoided redundant navigation to current location"
                    )
                  ) {
                    // But print any other errors to the console
                    console.log(error);
                  }
                });
              }
              resolve(response);
            } else {
              reject(response);
            }
          })
          .catch((erroror) => {
            console.log(erroror);
            reject(erroror);
          });
      });
    },

    logOut({ commit }) {
      commit("LOG_OUT");
      cookies.remove("loginToken");
      if (router.currentRoute != "login") {
        router.push("login").catch((error) => {
          // Ignore the vuex error regarding redundant navigation
          if (
            error.name !== "NavigationDuplicated" &&
            !error.message.includes(
              "Avoided redundant navigation to current location"
            )
          ) {
            // But print any other errors to the console
            console.log(error);
          }
        });
      }
    },

    checkLogin({ commit, dispatch }) {
      if (cookies.get("loginToken") == "QpwL5tke4Pnpja7X4") {
        commit("LOG_IN");
        if (router.currentRoute != "/") {
          router.push("/").catch((error) => {
            // Ignore the vuex error regarding redundant navigation
            if (
              error.name !== "NavigationDuplicated" &&
              !error.message.includes(
                "Avoided redundant navigation to current location"
              )
            ) {
              // But print any other errors to the console
              console.log(error);
            }
          });
        }
      } else {
        dispatch("logOut");
      }
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
