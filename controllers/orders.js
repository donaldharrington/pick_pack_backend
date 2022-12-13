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

export const getUnfulfilledOrders = async (req, res, next) => {
  try {
    const confirmed = req.query.confirmed;

    const service = new Orders(shopDomain, shopAccessToken);
    /**
     -fulfillment_status: 
        fulfilled   : Every line item in the order has been fulfilled.
        null        : None of the line items in the order have been fulfilled.
        partial     : At least one line item in the order has been fulfilled.
        restocked   : Every line item in the order has been restocked and the order canceled. 
        unshipped   : Show orders that have not yet been shipped. Returns orders with fulfillment_status of null.
        any         : Show orders of any fulfillment status.    
    -status : 
        open        : Show only open orders.
        closed      : Show only closed orders.
        cancelled   : Show only canceled orders.
        any         : Show orders of any status, including archived orders.     
    link: https://shopify.dev/api/admin-rest/2022-10/resources/order
    */

    let orders = [];
    let order_id = 1005002586063020;
    while ( true ) {
      let sub_orders = await service.list(
        {
          limit     : 250,
          query     : 'fulfillment_status:unshipped AND financial_status:paid AND id:<' + order_id,         // AND processing_method:express AND  financial_status:paid
          fields    : 'id, created_at, tags, currency, current_subtotal_price, financial_status, fulfillment_status, name, note, processing_method, customer, line_items'
        }
      );
      if ( sub_orders.length < 1 ) break;
      order_id = sub_orders[sub_orders.length - 1]['id'];
      orders = [...orders, ...sub_orders];
    }

    let pick_orders = [];   // unfulfilled and not have tag from this app
    let pack_orders = [];    // unfulfilled and have tag from this app

    let pattern = "Picked By ";
    pick_orders = orders.filter( (order) => {
      let tags = order.tags;
      return tags.indexOf(pattern) == -1;
    });

    pack_orders = orders.filter( (order) => {
      let tags = order.tags;
      return tags.indexOf(pattern) !== -1;
    });

    res.json({ 
      status        : 1, 
      count         : orders.length,
      pick_count    : pick_orders.length,
      pack_count    : pack_orders.length,
      msg           : "get total pick and pack order list",
      pick_orders   : pick_orders, 
      pack_orders   : pack_orders 
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
    const order = await service.get(id);

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

export const updateOrderNoteByID = async (req, res, next) => {
  try {
    const id = req.query.id; 
    const note = req.query.note;

    const service = new Orders(shopDomain, shopAccessToken);
    let order = await service.get(id);

    order.note = note;
    
    order = await service.update(id, order);

    res.json({ 
      status    : 1,
      msg       : "updated order's note", 
      order     : order
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderTagByID = async (req, res, next) => {
  try {
    const id = req.query.id; 
    const fullname = req.query.fullname;
    const tag = "Picked By " + fullname;

    const service = new Orders(shopDomain, shopAccessToken);
    let order = await service.get(id);

    let old_tags = order.tags;
    if ( old_tags.indexOf(fullname) !== -1 ) {
      res.json({ 
        status    : 1,
        msg       : "already exist this tag", 
        order     : order
      });
      return;
    }

    order.tags = old_tags + ", " + tag;
    
    order = await service.update(id, order);

    res.json({ 
      status    : 1,
      msg       : "updated order's tags", 
      order     : order
    });
  } catch (error) {
    next(error);
  }
};