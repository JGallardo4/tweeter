import Vue from "vue";
import VueRouter from "vue-router";
import RockPaperScissors from "../views/RockPaperScissors.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "RockPaperScissors",
    component: RockPaperScissors,
  },

  {
    path: "/login",
    name: "Login",
    component: Login,
  },

  // { path: "*", redirect: "/" },
];

const router = new VueRouter({
  mode: "hash",
  routes,
});

export default router;
