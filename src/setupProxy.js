import { hostName } from "utils/baseUrlUtils"

const createProxyMiddleware = require("http-proxy-middleware");
require("dotenv").config();

module.exports = function (app) {
  app.use(
    createProxyMiddleware(["/login", "/callback", "/logout", "/checkAuth", "graphql"], {
      target: `http://${hostName}:${process.env.BACKEND_PORT}`,
      changeOrigin: true,
      logLevel: "debug",
    })
  );
};
