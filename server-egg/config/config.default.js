/* eslint valid-jsdoc: "off" */

"use strict";
const path = require("path");
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1598495771851_639";

  config.multipart = {
    mode: "file",
    whitelist: () => true,
  };
  config.sequelize = {
    dialect: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "chz",
    password: "ahooge123",
    database: "ioe-app",
  };
  config.UPLOAD_DIR = path.resolve(__dirname, "..", "app/public");
  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
    security: {
      csrf: {
        enable: false,
      },
    },
    jwt: {
      secret: "@Kaikeba:2020!+",
    },
  };
};
