// import Vue from 'vue';

let Vue;
class VueRouter {
  constructor(options) {
    this.$options = options;
    this.routeMap = {};
    // console.log("view", this.$router.current);
    this.$options.routes.forEach((route) => {
      this.routeMap[route.path] = route;
    });
    console.log("vue", Vue.util);
    Vue.util.defineReactive(this, "current", "");
    window.addEventListener("hashchange", this.onHashChange.bind(this));
    window.addEventListener("load", this.onHashChange.bind(this));
  }
  onHashChange() {
    console.log(window.location.hash);
    this.current = window.location.hash.slice(1) || "/";
  }
}

VueRouter.install = function(_Vue) {
  Vue = _Vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    },
  });
  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        required: true,
      },
    },
    render(h) {
      return h("a", { attrs: { href: "#" + this.to } }, this.$slots.default);
      // return <a href={"#" + this.to}>{this.$slots.default}</a>;
    },
  });
  Vue.component("router-view", {
    render(h) {
      let component = null;
      const { routeMap, current } = this.$router;
      if (routeMap[current]) {
        component = routeMap[current].component;
      }
      return h(component);
    },
  });
};

export default VueRouter;
