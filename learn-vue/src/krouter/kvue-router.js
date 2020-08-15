// import Vue from 'vue';

let Vue;
class VueRouter {
  constructor(options) {
    this.$options = options;
    this.routeMap = {};
    // console.log("view", this.$router.current);
    // this.$options.routes.forEach((route) => {
    //   this.routeMap[route.path] = route;
    // });
    // this.findChildren(this.$options.routes);
    // console.log("child", this.routeMap);
    // console.log("vue", Vue.util);
    this.current = window.location.hash.slice(1) || "/";
    Vue.util.defineReactive(this, "matched", []);
    this.match();
    window.addEventListener("hashchange", this.onHashChange.bind(this));
    window.addEventListener("load", this.onHashChange.bind(this));
  }
  findChildren(routes) {
    routes.forEach((route) => {
      // console.log("test", route);
      this.routeMap[route.path] = route;
      if (route.children) {
        this.routeMap[route.path].children = route.children;
        this.findChildren(route.children);
      } else {
        return;
      }
    });
  }

  onHashChange() {
    console.log(window.location.hash);
    this.current = window.location.hash.slice(1) || "/";
    this.matched = [];
    this.match();
  }
  match(routes) {
    routes = routes || this.$options.routes;
    for (const route of routes) {
      if (route.path === "/" && this.current === "/") {
        this.matched.push(route);
        return;
      }
      if (route.path !== "/" && route.path.indexOf(this.current) != -1) {
        console.log(
          "route",
          route.path,
          this.current.indexOf(route.path) != -1
        );
        this.matched.push(route);
        if (route.children) {
          this.match(route.children);
        }
        return;
      }
    }
    console.log("match", this.matched);
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
      this.$vnode.data.routerView = true;
      let depth = 0;
      let parent = this.$parent;
      while (parent) {
        const vnodeData = parent.$vnode && parent.$vnode.data;
        if (vnodeData) {
          if (vnodeData.routerView) {
            depth++;
          }
        }
        parent = parent.$parent;
      }
      let component = null;
      // let child = [];
      // const { routeMap, current } = this.$router;
      // if (routeMap[current]) {
      //   let routeCurrent = routeMap[current];
      //   Object.keys(routeCurrent).forEach((key) => {
      //     if (key === "children") {
      //       routeCurrent[key].forEach((item) => {
      //         child.push(item.component);
      //       });
      //     }
      //   });
      //   component = routeMap[current].component;
      //   console.log("test", child);
      // }
      const route = this.$router.matched[depth];
      if (route) {
        component = route.component;
      }
      console.log("test", this.$vnode.data.routerView, depth, route, component);

      return h(component);
    },
  });
};

export default VueRouter;
