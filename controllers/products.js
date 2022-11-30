import { Products } from "shopify-admin-api";
import config from "../config/config.js";

const shopDomain        = config.shopDomain;
const shopAccessToken   = config.shopAccessToken;

export const getProductByID = async (req, res, next) => {
  try {
    const id = req.query.id; 
    const service = new Products(shopDomain, shopAccessToken);
    const product = await service.get(id);

    res.json({ 
      status    : 1,
      msg       : "get Product via id", 
      product   : product
    });
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const confirmed = req.query.confirmed;

    const service = new Products(shopDomain, shopAccessToken);
    const products = await service.list();
    res.json({ 
      status      : 1, 
      count       : products.length,
      msg         : "get total Product list",
      products    : products 
    });
  } catch (error) {
    next(error);
  }
};

export const getProductCount = async (req, res, next) => {
  try {
    const service = new Products(shopDomain, shopAccessToken);
    const product_count = await service.count();
    res.json({ 
      status        : 1, 
      msg           : "get total Product count",
      productCount  : product_count 
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProductByID = async (req, res, next) => {
  try {
    const id = req.query.id; 
    const service = new Products(shopDomain, shopAccessToken);
    await service.delete(id);

    res.json({ 
      status    : 1,
      msg       : "deleted Product"
    });
  } catch (error) {
    next(error);
  }
};

export const updateProductByID = async (req, res, next) => {
  try {
    const id = req.body.id; 
    const nProduct = req.body.Product;

    const service = new Products(shopDomain, shopAccessToken);
    const Product = await service.close(id);

    let keys = Object.keys(nProduct);    
    keys.forEach(key => {
      Product = {...Product, [key]: nProduct[key]};  
    });
    
    Product = await service.update(id, Product);

    res.json({ 
      status    : 1,
      msg       : "updated Product", 
      Product  : Product
    });
  } catch (error) {
    next(error);
  }
};