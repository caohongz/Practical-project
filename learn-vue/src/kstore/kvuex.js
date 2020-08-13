let Vue;

class Store {
  constructor(options) {
    this.$options = options;
    this._getters = options.getters;
    this.getters = {};
    const computed = {};
    const store = this;
    Object.keys(this._getters).forEach((key) => {
      const fn = store._getters[key];
      computed[key] = function() {
        return fn(store.state);
      };
      Object.defineProperty(store.getters, key, {
        get: () => store._vm[key],
      });
    });
    // Vue.util.defineReactive(this, "getters", {});
    // Vue.util.defineReactive(this, "state", options.state);
    this._vm = new Vue({
      data: { $$state: options.state },
      computed,
    });
    this._mutations = options.mutations;
    this._actions = options.actions;
    this.commit = this.commit.bind(this);
    this.dispatch = this.dispatch.bind(this);
  }

  get state() {
    return this._vm._data.$$state;
  }
  set state(val) {
    console.error("can't change state by yourself");
  }
  commit(type, payload) {
    const entry = this._mutations[type];
    if (!entry) {
      console.error("未知mutation类型");
      return;
    }
    entry(this.state, payload);
    console.log("getter", this.getters);
  }
  dispatch(type, payload) {
    const entry = this._actions[type];
    if (!entry) {
      console.error("未知action类型");
      return;
    }
    console.log("entry", entry);
    entry(this, payload);
  }
}

function install(_Vue) {
  Vue = _Vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    },
  });
}
export default { Store, install };
