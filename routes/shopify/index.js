import express from "express";


import {
    getOrders
} from "../../controllers/shopify.js";

const router = express.Router();

router.get("/get_orders", getOrders);

export default router;