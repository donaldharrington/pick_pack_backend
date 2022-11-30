import pkg from "dotenv";
pkg.config();

const config = {};

config.serverHost         = process.env.serverHost || "127.0.0.1";
config.serverPort         = process.env.serverPort || 8001;
config.shopDomain         = process.env.SHOP_DOMAIN || "https://karma-east-au.myshopify.com";
config.shopAccessToken    = process.env.ACCESS_TOKEN || "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";



export default config;
