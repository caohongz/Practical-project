<template>
  <div id="app">
    {{ message }}
    <transition name="fade">
      <p v-if="show">now u can see me</p>
    </transition>
    <button v-on:click="show = !show">Toggle</button>
  </div>
</template>
<script src="./js/vue.js" type="text/javascript" charset="utf-8"></script>
<script>
var app = new Vue({
  el: "#app",
  data: {
    message: "Hello Vue!",
    show: true,
  },
});
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
