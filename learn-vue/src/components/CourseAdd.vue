<template>
  <div>
    <input
      v-focus
      type="text"
      :value="value"
      @input="onInput"
      v-on:keydown.enter="addCourse"
    />
    <button @click="addCourse">add</button>
    <button @click="clearCourse">clear</button>
  </div>
</template>

<script>
export default {
  props: ["value"],
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      },
    },
  },
  methods: {
    addCourse() {
      this.$emit("add-course");
    },
    clearCourse() {
      this.$emit("clear-course");
    },
    onInput(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>

<style scoped></style>
