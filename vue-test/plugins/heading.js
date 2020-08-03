const MyPlugin = {
  install(Vue, options) {
    Vue.component("heading", {
      functional: true,
      props: {
        level: {
          type: Number,
          required: true,
        },
        title: {
          type: String,
          default: "曹洪智购物车",
        },
        icon: String,
      },
      render(h, context) {
        let children = [];
        const { icon, title, level } = context.props;
        if (icon) {
          children.push(
            h("svg", { class: "icon" }, [
              h("use", { attrs: { "xlink:href": "#icon-" + icon } }),
            ])
          );
        }
        children = children.concat(context.children);
        return h("h" + level, { attrs: { title } }, children);
      },
    });
  },
};
if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(MyPlugin);
}
