<template>
  <div>
    {{ message }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "hello Vue~",
    };
  },
};
</script>

<style scoped>
.body {
  font-size: 20px;
}
</style>
