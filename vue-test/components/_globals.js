import Vue from "vue";

const requireComponent = require.context(
  ".",
  false,
  /_base-[\w-]+\.vue$/
)

console.log(requireComponent);