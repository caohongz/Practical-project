<template>
  <div>
    <h3 @click="abc">child2</h3>
    <Child3 v-bind="$attrs" v-on="$listeners"></Child3>
    <button @click="sendToChild1">给Child1</button>
    <!-- <p>{{ $attrs.msg }}</p> -->
  </div>
</template>

<script>
// import Child3 from "@/component/Bus/child3.vue";
export default {
  components: {
    Child3: () => import("./child3.vue"),
  },
  methods: {
    sendToChild1() {
      // this.$bus.$emit("event-from-child2", "some msg from Child2");
      this.$parent.$emit("event-from-child2", "some msg from Child2");
    },
    abc() {
      this.$emit("abc");
      console.log(this.$listeners);
    },
  },
};
</script>

<style lang="scss" scoped></style>
