<template>
  <div>
    <Child1 msg="some msg from parent" @some-event="onSomeEvent"></Child1>
    <Child2></Child2>
  </div>
</template>

<script>
import Child1 from "@/components/Bus/child1.vue";
import Child2 from "@/components/Bus/child2.vue";

export default {
  components: {
    Child1,
    Child2,
  },
  methods: {
    onSomeEvent(msg) {
      console.log("Communition: ", msg);
    },
  },
};
</script>

<style lang="scss" scoped></style>
