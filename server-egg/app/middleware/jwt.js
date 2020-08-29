const jwt = require("jsonwebtoken");

module.exports = ({ app }) => {
  return async function verify(ctx, next) {
    if (!ctx.request.header.authorization) {
      ctx.body = {
        code: -666,
        message: "用户没有登陆",
      };
      return;
    }
    const token = ctx.request.header.authorization.replace("Bearer ", "");
    try {
      const ret = await jwt.verify(token, app.config.jwt.secret);
      // console.log(ret);
      ctx.state.email = ret.email;
      ctx.state.userid = ret._id;
      await next();
    } catch (e) {
      if (e.name == "TokenExpiredError") {
        ctx.body = {
          code: -666,
          message: "登陆过期了",
        };
      } else {
        ctx.body = {
          code: -1,
          message: "用户信息出错",
        };
      }
    }
  };
};
