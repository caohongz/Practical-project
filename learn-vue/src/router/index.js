import VueRouter from "../krouter/node_modules/kvue-router";
import Vue from "vue";
import Home from "../krouter/node_modules/@/views/Home";
import Admin from "../krouter/node_modules/@/views/admin";
import Detail from "../krouter/node_modules/@/views/Detail";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home },
  {
    path: "/login",
    name: "login",
    component: () => import("../krouter/node_modules/@/views/Login"),
  },
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
  {
    path: "/child",
    component: () => import("../krouter/node_modules/@/components/Bus/index"),
  },
  // { path: "/course/:name", component: Detail },
  {
    path: "*",
    component: () => import("../krouter/node_modules/@/views/_404"),
  },
];

export const router = new VueRouter({
  routes,
});
