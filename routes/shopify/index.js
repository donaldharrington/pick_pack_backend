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
} from "../../controllers/shopify.js";

const router = express.Router();

router.get("/get_order", getOrderByID);
router.get("/get_orders", getOrders);
router.get("/get_order_count", getOrderCount);
router.get("/open_order", openOrderByID);
router.get("/delete_order", deleteOrderByID);
router.get("/close_order", closeOrderByID);
router.get("/cancel_order", cancelOrderByID);
router.post("/update_order", updateOrderByID);

export default router;