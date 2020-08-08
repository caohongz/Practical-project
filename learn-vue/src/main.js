import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import Admin from "@/views/admin";
import Detail from "@/views/Detail";
import store from "./store";
import "./plugins/element.js";

Vue.config.productionTip = false;

Vue.use(VueRouter);
const routes = [
  { path: "/", component: Home },
  { path: "/login", name: "login", component: () => import("@/views/Login") },
  {
    path: "/admin",
    component: Admin,
    children: [
      {
        path: "course/:name",
        name: "detail",
        component: Detail,
      },
    ],
    meta: {
      auth: true,
    },
    // beforeEnter(to, from, next) {
    //   // 判断路由是否需要守卫

    //   if (window.isLogin) {
    //     next();
    //   } else {
    //     next("/login?redirect=" + to.fullPath);
    //   }
    // },
  },
  { path: "/child", component: () => import("@/components/Bus/index") },
  // { path: "/course/:name", component: Detail },
  { path: "*", component: () => import("@/views/_404") },
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  // 判断路由是否需要守卫
  if (to.meta.auth) {
    if (store.state.user.isLogin) {
      next();
    } else {
      next("/login?redirect=" + to.fullPath);
    }
  } else {
    next();
  }
});

class Bus {
  constructor() {
    this.callbacks = {};
  }
  $on(name, fn) {
    this.callbacks[name] = this.callbacks[name] || [];
    this.callbacks[name].push(fn);
  }
  $emit(name, args) {
    if (this.callbacks[name]) {
      this.callbacks[name].forEach((cb) => cb(args));
    }
  }
}

Vue.prototype.$bus = new Bus();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
