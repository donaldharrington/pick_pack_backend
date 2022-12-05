import { Customers } from "shopify-admin-api";
import config from "../config/config.js";

const shopDomain        = config.shopDomain;
const shopAccessToken   = config.shopAccessToken;

export const getCustomerByID = async (req, res, next) => {
  try {
    const id = req.query.id; 
    const service = new Customers(shopDomain, shopAccessToken);
    const customer = await service.get(id);

    res.json({ 
      status    : 1,
      msg       : "get Cutomer via id", 
      customer  : customer
    });
  } catch (error) {
    next(error);
  }
};

export const getCustomerByEmail = async (req, res, next) => {
  try {
    const email = req.query.email; 
    const service = new Customers(shopDomain, shopAccessToken);
    const customers = await service.list(
      {
        email: email
      }
    );

    if ( customers.length < 1 ) {
      res.json({ 
        status    : 0,
        msg       : "check customer validation", 
        customers : null
      });
    } else {
      res.json({ 
        status    : 1,
        msg       : "check customer validation", 
        customer  : customers[0]
      });
    } 
    
  } catch (error) {
    next(error);
  }
};

export const getCustomers = async (req, res, next) => {
  try {
    const confirmed = req.query.confirmed;

    const service = new Customers(shopDomain, shopAccessToken);
    const customers = await service.list(
      {
        email: 'ian@webanimtech.com'
      }
    );

    res.json({ 
      status      : 1, 
      count       : customers.length,
      msg         : "get total Cutomer list",
      customers   : customers 
    });
  } catch (error) {
    next(error);
  }
};

export const getCustomerCount = async (req, res, next) => {
  try {
    const service = new Customers(shopDomain, shopAccessToken);
    const customer_count = await service.count();
    res.json({ 
      status        : 1, 
      msg           : "get total Customer count",
      customerCount : customer_count 
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCustomerByID = async (req, res, next) => {
  try {
    const id = req.query.id; 
    const service = new Customers(shopDomain, shopAccessToken);
    await service.delete(id);

    res.json({ 
      status    : 1,
      msg       : "deleted Cutomer"
    });
  } catch (error) {
    next(error);
  }
};

export const updateCustomerByID = async (req, res, next) => {
  try {
    const id = req.body.id; 
    const ncustomer = req.body.customer;

    const service = new Customers(shopDomain, shopAccessToken);
    const customer = await service.close(id);

    let keys = Object.keys(ncustomer);    
    keys.forEach(key => {
      customer = {...customer, [key]: ncustomer[key]};  
    });
    
    customer = await service.update(id, customer);

    res.json({ 
      status    : 1,
      msg       : "updated Cutomer", 
      customer  : customer
    });
  } catch (error) {
    next(error);
  }
};