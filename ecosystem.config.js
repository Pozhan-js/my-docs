/*
 * @Date: 2022-10-20 16:24:42
 * @LastEditors: hsjzhcq 2533094475@qq.com
 * @LastEditTime: 2022-10-20 19:04:14
 * @FilePath: \education-pc\ecosystem.config.js
 */
// pm2 启动文件
module.exports = {
  apps: [
    {
      name: "resume",
      exec_mode: "cluster",
      instances: "1", // Or a number of instances
      script: "./node_modules/nuxt/bin/nuxt.js",
      args: "start",
    },
  ],
};
