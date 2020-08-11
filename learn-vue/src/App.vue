<template>
  <div id="app">
    <!-- <nav class="nav">
      <router-link to="/">首页</router-link>
      <router-link to="/admin">管理</router-link>
      <router-link to="/child" v-on:abc="onAbc">通信</router-link>
      <span v-if="isLogin">
        {{ welcome }}
        <button @click="logout">注销</button>
      </span>
    </nav>
    <router-view></router-view> -->
    <!-- <FormExample></FormExample> -->
    <FormExample></FormExample>
  </div>
</template>

<script>
// import { mapState, mapGetters } from "vuex";
import FormExample from "./components/form/index";
// import TicTacToe from "./components/TicTacToe/index";
export default {
  components: { FormExample },
  // data() {
  //   return {
  //     ruleForm: {
  //       name: "",
  //       region: "",
  //       date1: "",
  //       date2: "",
  //       delivery: false,
  //       type: [],
  //       resource: "",
  //       desc: "",
  //     },
  //     rules: {
  //       name: [
  //         { required: true, message: "请输入活动名称", trigger: "blur" },
  //         { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
  //       ],
  //       region: [
  //         { required: true, message: "请选择活动区域", trigger: "change" },
  //       ],
  //       date1: [
  //         {
  //           type: "date",
  //           required: true,
  //           message: "请选择日期",
  //           trigger: "change",
  //         },
  //       ],
  //       date2: [
  //         {
  //           type: "date",
  //           required: true,
  //           message: "请选择时间",
  //           trigger: "change",
  //         },
  //       ],
  //       type: [
  //         {
  //           type: "array",
  //           required: true,
  //           message: "请至少选择一个活动性质",
  //           trigger: "change",
  //         },
  //       ],
  //       resource: [
  //         { required: true, message: "请选择活动资源", trigger: "change" },
  //       ],
  //       desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
  //     },
  //   };
  // },
  // computed: {
  //   ...mapState("user", ["isLogin"]),
  //   ...mapGetters("user", ["welcome"]),
  // },
  // methods: {
  //   logout() {
  //     this.$store.commit("user/logout");
  //     this.$router.push("/");
  //   },
  //   submitForm(formName) {
  //     this.$refs[formName].validate((valid) => {
  //       if (valid) {
  //         alert("submit!");
  //       } else {
  //         console.log("error submit!!");
  //         return false;
  //       }
  //     });
  //   },
  //   resetForm(formName) {
  //     this.$refs[formName].resetFields();
  //   },
  //   onAbc() {
  //     console.log("abc from app");
  //   },
  // },
};
</script>

<style>
.nav {
  margin: 10px;
}
</style>
