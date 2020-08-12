<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "KForm",
  componentName: "KForm",
  provide() {
    return {
      form: this,
    };
  },

  props: {
    model: {
      type: Object,
      required: true,
    },
    rules: Object,
  },
  data() {
    return {
      fields: [],
    };
  },
  created() {
    this.$on("set-field", (field) => {
      if (field) {
        this.fields.push(field);
      }
    });
  },
  methods: {
    validate(cb) {
      const tasks = this.fields
        .filter((item) => item.prop)
        .map((item) => item.validate());
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
      // console.log(this.$children);
    },
  },
};
</script>

<style scoped></style>
