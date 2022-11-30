import express from "express";


import {
    getOrderByID,
    getOrders,
    getOrderCount, 
    openOrderByID,
    deleteOrderByID,
    closeOrderByID, 
    cancelOrderByID, 
    updateOrderByID
} from "../../controllers/orders.js";

import {
    getCustomerByID,
    getCustomers,
    getCustomerCount, 
    deleteCustomerByID, 
    updateCustomerByID
} from "../../controllers/customers.js";

import {
    getProductByID,
    getProducts,
    getProductCount, 
    deleteProductByID
} from "../../controllers/products.js";

const router = express.Router();

router.get("/get_order", getOrderByID);
router.get("/get_orders", getOrders);
router.get("/get_order_count", getOrderCount);
router.get("/open_order", openOrderByID);
router.get("/delete_order", deleteOrderByID);
router.get("/close_order", closeOrderByID);
router.get("/cancel_order", cancelOrderByID);
router.post("/update_order", updateOrderByID);

router.get("/get_customer", getCustomerByID);
router.get("/get_customers", getCustomers);
router.get("/get_customer_count", getCustomerCount);
router.get("/delete_customer", deleteCustomerByID);
router.post("/update_customer", updateCustomerByID);

router.get("/get_product", getProductByID);
router.get("/get_products", getProducts);
router.get("/get_product_count", getProductCount);
router.get("/delete_product", deleteProductByID);

export default router;