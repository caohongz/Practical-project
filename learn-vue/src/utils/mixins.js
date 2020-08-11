export const mixins = {
  methods: {
    findParent(vm, componentName, eventName) {
      let Parent = vm.$parent;
      if (Parent && Parent.$options.componentName === componentName) {
        Parent.$emit(eventName);
        return;
      } else {
        this.findParent(Parent, componentName, eventName);
      }
    },
  },
};
