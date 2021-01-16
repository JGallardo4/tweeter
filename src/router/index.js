import Vue from "vue";
import VueRouter from "vue-router";
import TweeterMain from "../views/TweeterMain.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: TweeterMain,
  },

  {
    path: "/login",
    name: "Login",
    component: Login,
  },

  {
    path: "/register",
    name: "Register",
    component: Register,
  },

  // { path: "*", redirect: "/" },
];

const router = new VueRouter({
  mode: "hash",
  routes,
});

export default router;
