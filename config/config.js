import pkg from "dotenv";
pkg.config();

const config = {};

config.serverHost         = process.env.serverHost || "127.0.0.1";
config.serverPort         = process.env.serverPort || 8001;
config.shopDomain         = process.env.SHOP_DOMAIN;
config.shopAccessToken    = process.env.ACCESS_TOKEN;



export default config;
