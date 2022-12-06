import { Auth, Shops  } from "shopify-admin-api";
import config from "../config/config.js";

const shopDomain        = config.shopDomain;
const shopAccessToken   = config.shopAccessToken;


export const isValidDomain = async (req, res, next) => {
  try {
    const domain = req.query.domain; 
    const isValidUrl = await Auth.isValidShopifyDomain(domain)

    const shops = null;

    const service = new Shops(shopDomain, shopAccessToken);
    if ( isValidUrl ) shops = await service.get();

    res.json({ 
      status      : 1,
      msg         : "check Shopify domain validation", 
      isValidUrl  : isValidUrl,
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

