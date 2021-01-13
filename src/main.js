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
      if (cookies.get("loginToken") == "QpwL5tke4Pnpja7X4") {
        commit("LOG_IN");
        redirect("/");
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
