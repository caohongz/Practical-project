<template>
  <div>
    <el-form
      class="login-form"
      label-width="100px"
      :model="form"
      :rules="rules"
      ref="loginForm"
    >
      <el-form-item prop="email">
        <span><i class="el-icon-mobile"></i></span>
        <el-input v-model="form.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="passwd">
        <span><i class="el-icon-lock"></i></span>
        <el-input
          v-model="form.passwd"
          type="password"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input v-model="form.captcha" placeholder="验证码"></el-input>
        <img @click="updateCaptcha" :src="captchaUrl" alt="" />
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
  data() {
    return {
      form: {
        email: "hljchz@163.com",
        passwd: "ahooge123",
        captcha: ""
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
        ]
      },
      captchaUrl: "/api/captcha?_t=" + new Date().getTime()
    };
  },
  methods: {
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

<style>
.login-form {
  width: 800px;
  margin: 50px auto;
}
.login-container {
  width: 100%;
  min-height: 100%;
}
.login-container .login-form {
  width: 520px;
  padding: 160px 0;
  margin: 0 auto;
}
.title-container {
  text-align: center;
  margin: 20px;
}
.title-container img {
  width: 200px;
}
.captcha-container {
  width: 340px;
  position: absolute;
}
.captcha-container .captcha {
  position: absolute;
  right: -110px;
}
.captcha-container .captcha img {
  width: 90px;
  height: 50px;
  cursor: pointer;
}
</style>
