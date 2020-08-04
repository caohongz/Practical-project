<template>
  <div>
    <button @click="login" v-if="!isLogin">登录</button>
    <button @click="logout" v-else>注销</button>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  methods: {
    login() {
      // window.isLogin = true;
      // this.$store.commit("login");
      // this.$store
      //   .dispatch("user/login", "admin")
      //   .then(() => {
      this["user/login"]("admin")
        .then(() => {
          this.$router.push(this.$route.query.redirect);
        })
        .catch(() => {
          console.log("登录失败");
        });
    },
    logout() {
      // window.isLogin = false;
      this.$store.commit("user/logout");
      // this["user/logout"];
      console.log(this.isLogin);
      this.$router.push("/");
    },
    ...mapActions(["user/login"]),
    ...mapMutations(["user/logout"]),
  },
  computed: {
    // isLogin() {
    //   return this.$store.state.user.isLogin;
    // },
    ...mapState("user", ["isLogin"]),
  },
};
</script>

<style lang="scss" scoped></style>
