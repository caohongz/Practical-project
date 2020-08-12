import Vue from "vue";

export function create(Component, props) {
  const Ctor = Vue.extend(Component);
  const comp = new Ctor({ propsData: props }).$mount();
  console.log("comp", comp.$el);
  document.body.appendChild(comp.$el);
  // const comp = vm.$children[0];
  comp.remove = () => {
    document.body.removeChild(comp.$el);
    comp.$destroy();
  };
  // console.log("test", comp);

  // const vm = new Vue({
  //   render(h) {
  //     return h(Component, { props });
  //   },
  // }).$mount();
  // document.body.appendChild(vm.$el);
  // const comp = vm.$children[0];
  // comp.remove = () => {
  //   document.body.removeChild(vm.$el);
  //   vm.$destroy();
  // };
  return comp;
}
