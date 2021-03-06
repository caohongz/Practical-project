// import Vue from "vue";
// import Vuex from "vuex";
// import user from "./user";
// import persist from "./plugins/persist";

// Vue.use(Vuex);

// export default new Vuex.Store({
//   modules: {
//     user,
//   },
//   strict: true,
//   plugins: [persist],
// });

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    counter: 0,
  },
  mutations: {
    add(state) {
      state.counter++;
    },
  },
  actions: {
    add({ commit }) {
      setTimeout(() => {
        commit("add");
      }, 1000);
    },
  },
  modules: {},
});
