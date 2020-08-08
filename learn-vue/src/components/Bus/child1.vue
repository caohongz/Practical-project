<template>
  <div></div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: "",
    },
  },
  mounted() {
    this.$emit("some-event", "hello");
    this.$bus.$on("event-from-child2", (msg) => {
      console.log("Child1: ", msg);
    });
  },
};
</script>

<style lang="scss" scoped></style>
