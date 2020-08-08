<template>
  <div>
    <h3>child2</h3>
    <button @click="sendToChild1">给Child1</button>
  </div>
</template>

<script>
export default {
  methods: {
    sendToChild1() {
      this.$bus.$emit("event-from-child2", "some msg from Child2");
    },
  },
};
</script>

<style lang="scss" scoped></style>
