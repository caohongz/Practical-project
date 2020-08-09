<template>
  <div>
    <h3>child3</h3>
    <p>{{ $attrs.msg }}</p>
    <button @click="$emit('abc')">给Child1</button>
    <p>{{ foo }}</p>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  inject: ["foo"],
  // props: ["msg"],
  methods: {
    sendToChild1() {
      // this.$bus.$emit("event-from-child2", "some msg from Child2");
      this.$parent.$emit("event-from-child2", "some msg from Child2");
    },
  },
};
</script>

<style lang="scss" scoped></style>
