<template>
  <div>
    <Child2 :msg="'othermsg'" @abc="onAbc"></Child2>
    <!-- <Child3></Child3> -->
    <Child1 msg="some msg from parent" @some-event="onSomeEvent"></Child1>
  </div>
</template>

<script>
import Child1 from "@/components/Bus/child1.vue";
import Child2 from "@/components/Bus/child2.vue";

export default {
  provide() {
    return {
      foo: "abcFoo",
    };
  },
  data() {
    return {
      value: "value",
    };
  },
  components: {
    Child2,
    Child1,
  },
  methods: {
    onSomeEvent(msg) {
      console.log("Communition: ", msg);
    },
    onAbc() {
      console.log("abc from index");
    },
  },
  mounted() {
    console.log(this.$listeners);
  },
};
</script>

<style lang="scss" scoped></style>
