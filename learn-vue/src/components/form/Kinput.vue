<template>
  <div>
    <input :type="type" :value="value" @input="onInput" v-bind="$attrs" />
    <!-- <p>{{ value }}</p> -->
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
  },
  methods: {
    onInput(e) {
      this.$emit("input", e.target.value);
      this.$parent.$emit("validate");
      console.log(this.$parent.validate);
    },
  },
};
</script>

<style scoped></style>
