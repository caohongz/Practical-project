<template>
  <div id="app">
    <nav class="nav">
      <router-link to="/">首页</router-link>
      <router-link to="/admin">管理</router-link>
      <span v-if="isLogin">
        {{ welcome }}
        <button @click="logout">注销</button>
      </span>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState("user", ["isLogin"]),
    ...mapGetters("user", ["welcome"]),
  },
  methods: {
    logout() {
      this.$store.commit("user/logout");
      this.$router.push("/");
    },
  },
};
</script>

<style>
.nav {
  margin: 10px;
}
</style>
