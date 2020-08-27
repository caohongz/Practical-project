<template>
  <div>
    <el-form
      class="login-form"
      label-width="100px"
      :model="form"
      :rules="rules"
      ref="loginForm"
    >
      <el-form-item prop="email" label="邮箱">
        <!-- <span><i class="el-icon-mobile"></i></span> -->
        <el-input v-model="form.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="passwd" label="密码">
        <!-- <span><i class="el-icon-lock"></i></span> -->
        <el-input
          v-model="form.passwd"
          type="password"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="captcha" label="验证码">
        <el-input
          v-model="form.captcha"
          placeholder="验证码"
          style="width:160px"
        ></el-input>
        <img @click="updateCaptcha" :src="captchaUrl" alt="" />
      </el-form-item>
      <el-form-item
        prop="emailcode"
        label="邮箱验证码"
        class="captcha-container"
      >
        <div class="captcha">
          <el-button
            @click="sendEmailCode"
            type="primary"
            :disabled="send.timer > 0"
            >{{ sendText }}</el-button
          >
          <el-input
            style="width:160px"
            v-model="form.emailcode"
            placeholder="邮箱验证码"
          ></el-input>
        </div>
      </el-form-item>
      <el-form-item prop="" label="">
        <el-button type="primary" @click.native.prevent="handleLogin"
          >登陆</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import md5 from "md5";

export default {
  layout: "login",
  computed: {
    sendText() {
      if (this.send.timer <= 0) {
        return "发送";
      }
      return `${this.send.timer}秒`;
    }
  },
  data() {
    return {
      send: {
        timer: 0
      },
      form: {
        email: "18511283565@163.com",
        passwd: "ahooge123",
        captcha: "",
        emailcode: ""
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱" },
          { type: "email", message: "请输入正确得邮箱格式" }
        ],
        captcha: [{ required: true, message: "请输入验证码" }],
        passwd: [
          {
            required: true,
            pattern: /^[\w_-]{6,12}$/g,
            message: "请输入6~12位密码"
          }
        ],
        emailcode: [{ required: true, message: "请输入邮箱验证码" }]
      },
      captchaUrl: "/api/captcha?_t=" + new Date().getTime()
    };
  },
  methods: {
    async sendEmailCode() {
      let ret = await this.$http.get("/sendcode?email=" + this.form.email);
      this.send.timer = 10;
      this.timer = setInterval(() => {
        this.send.timer -= 1;
        if (this.send.timer === 0) {
          clearInterval(this.timer);
        }
      }, 1000);
    },
    updateCaptcha() {
      this.captchaUrl = "/api/captcha?_t=" + new Date().getTime();
    },
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          console.log("校验成功");
          let obj = {
            email: this.form.email,
            passwd: md5(this.form.passwd),
            captcha: this.form.captcha
          };
          let ret = await this.$http.post("/user/login", obj);
          if (ret.code == 0) {
            localStorage.setItem("token", res.data.token);
            this.$alert("登陆成功", "成功", {
              confirmButtonText: "去首页",
              callback: () => {
                this.$router.push("/");
              }
            });
          } else {
            this.$message.error(ret.message);
          }
        } else {
          console.log("校验失败");
        }
      });
    }
  }
};
</script>

<style></style>
