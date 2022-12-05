import { Shops  } from "shopify-admin-api";
import config from "../config/config.js";

const shopDomain        = config.shopDomain;
const shopAccessToken   = config.shopAccessToken;


export const getShopInfo = async (req, res, next) => {
  try {
    const service = new Shops(shopDomain, shopAccessToken);
    const shops = await service.get();

    res.json({ 
      status      : 1,
      msg         : "get shop detail infomation", 
      shops       : shops
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const signinUser = async (req, res, next) => {
  try {
    res.json({msg: "Login Success"});
  } catch (error) {
    console.log(error);
    next(error);
  }
};

