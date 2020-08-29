"use strict";

const BaseController = require("./base");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

const HashSalt = ":Kaikeba@good!@123";
const createRule = {
  email: { type: "email" },
  nickname: { type: "string" },
  passwd: { type: "string" },
  captcha: { type: "string" },
};

class HomeController extends BaseController {
  async login() {
    // this.success("token");
    const { ctx, app } = this;
    const { email, captcha, passwd, emailcode } = ctx.request.body;
    if (captcha.toUpperCase() !== ctx.session.captcha.toUpperCase()) {
      return this.error("验证码错误", -66);
    }
    if (emailcode !== ctx.session.emailcode) {
      return this.error("邮箱验证码错误", -66);
    }
    const user = await ctx.model.User.findOne({
      email,
      passwd: md5(passwd + HashSalt),
    });
    if (!user) {
      return this.error("用户名密码错误");
    }
    const token = jwt.sign(
      {
        _id: user._id,
        email,
      },
      app.config.jwt.secret,
      { expiresIn: "24h" }
    );
    this.success({ token, email, nickname: user.nickname });
  }
  async register() {
    const { ctx } = this;
    try {
      ctx.validate(createRule);
    } catch (e) {
      return this.error("参数校验失败", -1, e.errors);
    }

    const { email, passwd, captcha, nickname } = ctx.request.body;
    // console.log(email, passwd, captcha, nickname);
    if (captcha.toUpperCase() === ctx.session.captcha.toUpperCase()) {
      if (await this.checkEmail(email)) {
        this.error("邮箱重复啦", -65);
      } else {
        const ret = await ctx.model.User.create({
          email,
          nickname,
          passwd: md5(passwd + HashSalt),
        });
        if (ret._id) {
          this.message("注册成功");
        } else {
          this.error("注册失败", -63);
        }
      }
    } else {
      this.error("验证码错误", -66);
    }

    // this.success({ name: "bob" });
  }
  async checkEmail(email) {
    const user = await this.ctx.model.User.findOne({ email });
    return user;
  }
  async verify() {}
  async info() {
    const { ctx } = this;
    const { email } = ctx.state;
    const user = await this.checkEmail(email);
    this.success(user);
  }
  async reset() {
    const { ctx } = this;
    const email = ctx.query.email;
    const ret = await ctx.model.User.findOneAndUpdate(
      { email },
      { $set: { passwd: md5(md5("ac2020") + HashSalt) } }
    );
    // const ret = await this.checkEmail(email);
    console.log(ret);

    this.success("重置成功");
  }
}

module.exports = HomeController;
