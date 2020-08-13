// import Vue from 'vue';

const { default: Vue } = require("vue");

let Vue;
class VueRouter {}

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
        required: true
      }
    },
    render(h) {
      return h("a",
      {attrs: {href='#'+this.to}},
      this.$slots.default
      )
    }
  });
  Vue.component("router-view", {
    render(h) {
      return h("div","router-view content...")
    }
  });
};

export default VueRouter;
