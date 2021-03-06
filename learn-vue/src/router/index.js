import VueRouter from "vue-router";
import Vue from "vue";
import Home from "@/views/Home";
import Course from "@/views/admin";
import Detail from "@/views/Detail";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login"),
  },
  {
    path: "/course",
    component: Course,
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
    component: () => import("@/components/Bus/index"),
  },
  // { path: "/course/:name", component: Detail },
  {
    path: "*",
    component: () => import("@/views/_404"),
  },
];

export const router = new VueRouter({
  routes,
});
