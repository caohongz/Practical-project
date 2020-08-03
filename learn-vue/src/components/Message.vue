<template>
  <div class="message-box" v-if="show">
    <slot name="title" title="通过message"></slot>
    <slot></slot>
    <button class="message-box-close" @click="toggle">X</button>
  </div>
</template>

<script>
const helloMixin = {
  created() {
    this.hello();
  },
  methods: {
    hello() {
      console.log("hello from mixins");
    },
  },
};
export default {
  data() {
    return {
      show: false,
    };
  },
  mixins: [helloMixin],
  methods: {
    toggle() {
      this.show = !this.show;
    },
  },
};
</script>

<style scoped>
.message-box {
  padding: 10px 20px;
  background: #4fc08d;
  border: 1px solid #42b983;
}
.success {
  padding: 10px 20px;
  background: #4fc08d;
  border: 1px solid #42b983;
}
.warning {
  padding: 10px 20px;
  background: red;
  border: 1px solid red;
}
.message-box-close {
  float: right;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
