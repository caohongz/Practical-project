<template>
  <div>
    <!-- <ElementTest></ElementTest> -->
    <KForm :model="model" :rules="rules" ref="form">
      <KFormItem label="用户名" prop="username">
        <KKB>
          <Kinput v-model="model.username"></Kinput>
        </KKB>
      </KFormItem>
      <KFormItem label="密码" prop="password">
        <KKB>
          <Kinput
            v-model="model.password"
            type="'password'"
            placeholder="请输入密码"
          ></Kinput>
        </KKB>
      </KFormItem>
      <KFormItem>
        <button @click="onLogin">登陆</button>
      </KFormItem>
    </KForm>
  </div>
</template>

<script>
// import ElementTest from "./ElementTest";
import Kinput from "./Kinput";
import KFormItem from "./KFormItem";
import KForm from "./KForm";
import KKB from "./KKB";
export default {
  data() {
    return {
      model: {
        username: "tom",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "用户名为必填项" }],
        password: [{ required: true, message: "密码为必填项" }],
      },
    };
  },
  components: { Kinput, KFormItem, KForm, KKB },
  methods: {
    onLogin() {
      this.$refs.form.validate((valid) => {
        // if (valid) {
        //   alert("校验成功，登陆！");
        // } else {
        //   alert("校验失败，请重试");
        // }
        this.$notice({
          title: "村长喊你来搬砖",
          message: valid ? "校验成功，登陆！" : "校验失败，请重试",
        });
      });
    },
  },
};
</script>

<style scoped></style>
