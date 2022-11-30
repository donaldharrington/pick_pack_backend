import mongoose from 'mongoose';
import { Orders } from "shopify-admin-api";
import config from "../config/config.js";

const shopDomain        = config.shopDomain;
const shopAccessToken   = config.shopAccessToken;

export const getOrderByID = async (req, res, next) => {
  try {
    const id = req.query.id; 
    const service = new Orders(shopDomain, shopAccessToken);
    const order = await service.get(id);

    res.json({ 
      status    : 1,
      msg       : "get order via id", 
      order     : order
    });
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const confirmed = req.query.confirmed;

    const service = new Orders(shopDomain, shopAccessToken);
    const orders = await service.list();
    res.json({ 
      status      : 1, 
      count       : orders.length,
      msg         : "get total order list",
      orders      : orders 
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderCount = async (req, res, next) => {
  try {
    const service = new Orders(shopDomain, shopAccessToken);
    const order_count = await service.count();
    res.json({ 
      status      : 1, 
      msg         : "get total order count",
      orderCount  : order_count 
    });
  } catch (error) {
    next(error);
  }
};

export const openOrderByID = async (req, res, next) => {
  try {
    const id = req.query.id; 
    const service = new Orders(shopDomain, shopAccessToken);
    const order = await service.open(id);

    res.json({ 
      status    : 1,
      msg       : "opened order", 
      order     : order
    });
  } catch (error) {
    next(error);
  }
};

export const closeOrderByID = async (req, res, next) => {
  try {
    const id = req.query.id; 
    const service = new Orders(shopDomain, shopAccessToken);
    const order = await service.close(id);

    res.json({ 
      status    : 1,
      msg       : "closed order", 
      order     : order
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOrderByID = async (req, res, next) => {
  try {
    const id = req.query.id; 
    const service = new Orders(shopDomain, shopAccessToken);
    await service.delete(id);

    res.json({ 
      status    : 1,
      msg       : "deleted order"
    });
  } catch (error) {
    next(error);
  }
};

export const cancelOrderByID = async (req, res, next) => {
  try {
    const id = req.query.id; 
    const service = new Orders(shopDomain, shopAccessToken);
    await service.cancel(id, {
      reason: "Customer"
    });

    res.json({ 
      status    : 1,
      msg       : "canceled order"
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderByID = async (req, res, next) => {
  try {
    const id = req.body.id; 
    const norder = req.body.order;

    const service = new Orders(shopDomain, shopAccessToken);
    const order = await service.close(id);

    let keys = Object.keys(norder);    
    keys.forEach(key => {
      order = {...order, [key]: norder[key]};  
    });
    
    order = await service.update(id, order);

    res.json({ 
      status    : 1,
      msg       : "updated order", 
      order     : order
    });
  } catch (error) {
    next(error);
  }
};