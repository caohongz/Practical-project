import Layout from "@/layout/index.vue";
import { RouteConfig } from "vue-router";
export const playerRoutes: RouteConfig = {
  path: "/players",
  component: Layout,
  meta: {
    title: "playerMgt",
    icon: "peoples"
  },
  children: [
    {
      path: "list",
      component: () => import("@/views/player/list.vue"),
      meta: {
        title: "playerList",
        icon: "players"
      }
    },
    {
      path: "create",
      component: () => import("@/views/player/create"),
      meta: {
        title: "createPlayer",
        icon: "edit"
      }
    },
    {
      path: "edit/:id(\\d+)",
      component: () => import("@/views/player/edit.vue"),
      meta: {
        title: "editPlayer",
        hidden: true,
        noCache: true,
        activeMenu: "/players/list"
      }
    }
  ]
};
