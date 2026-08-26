import { Router } from "express";
import { createOrder, getOrderByNumber } from "../controllers/ordersController";
import { orderCreateLimiter, orderLookupLimiter } from "../middleware/rateLimiter";

const router = Router();

router.post("/", orderCreateLimiter, createOrder);
router.get("/:orderNumber", orderLookupLimiter, getOrderByNumber);

export default router;
