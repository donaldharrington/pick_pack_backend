import mongoose from 'mongoose';
import { Orders } from "shopify-admin-api";
import config from "../config/config.js";

export const getOrders = async (req, res, next) => {
  try {
    const service = new Orders(config.shopDomain, config.shopAccessToken);
    const orders = await service.list();
    res.json({ 
      status: 1, 
      count: orders.length,
      orders: orders 
    });
  } catch (error) {
    next(error);
  }
};
