import Vue from "vue";
import App from "./App.vue";

import store from "./kstore";
import { router } from "./krouter";
import "./plugins/element.js";
import { create } from "./utils/create";
import Notice from "@/components/Notice";

Vue.config.productionTip = false;

// router.beforeEach((to, from, next) => {
//   // 判断路由是否需要守卫
//   if (to.meta.auth) {
//     if (store.state.user.isLogin) {
//       next();
//     } else {
//       next("/login?redirect=" + to.fullPath);
//     }
//   } else {
//     next();
//   }
// });

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
Vue.prototype.$notice = (opts) => {
  const comp = create(Notice, opts);
  comp.show();
  return comp;
};

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
