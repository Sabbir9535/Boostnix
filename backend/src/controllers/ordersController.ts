import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { generateOrderNumber } from "../utils/orderNumber";
import { createOrderSchema, orderNumberParamSchema } from "../validators/orderValidator";
import { ApiError } from "../middleware/errorHandler";

// POST /api/orders
export async function createOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const input = createOrderSchema.parse(req.body);

    const service = await prisma.service.findUnique({ where: { id: input.serviceId } });
    if (!service || service.status !== "ACTIVE") {
      throw new ApiError(400, "নির্বাচিত সার্ভিসটি এখন পাওয়া যাচ্ছে না।");
    }

    // The client only submits quantity; pricing always comes from the database.
    const isFollowerOrLike = /followers|likes/i.test(service.name);
    const pricePerUnit = isFollowerOrLike
      ? new Prisma.Decimal("0.0605")
      : service.pricePerUnit ?? service.price.div(service.quantity);
    const amount = pricePerUnit.mul(input.quantity);

    const orderNumber = await generateOrderNumber();

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName: input.customerName,
        phone: input.phone,
        email: input.email,
        serviceId: service.id,
        serviceName: service.name,
        quantity: input.quantity,
        socialLink: input.socialLink,
        paymentMethod: input.paymentMethod,
        transactionId: input.transactionId,
        amount,
        customerNote: input.customerNote,
        status: "PENDING",
      },
    });

    res.status(201).json({
      orderNumber: order.orderNumber,
      status: order.status,
      serviceName: order.serviceName,
      quantity: order.quantity,
      amount: order.amount,
      createdAt: order.createdAt,
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/orders/:orderNumber
// Public tracking endpoint — deliberately returns only non-sensitive fields.
// Phone, email, transaction ID, and internal notes are never exposed here.
export async function getOrderByNumber(req: Request, res: Response, next: NextFunction) {
  try {
    const { orderNumber } = orderNumberParamSchema.parse(req.params);

    const order = await prisma.order.findUnique({
      where: { orderNumber: orderNumber.toUpperCase() },
      select: {
        orderNumber: true,
        serviceName: true,
        quantity: true,
        amount: true,
        status: true,
        createdAt: true,
      },
    });

    if (!order) {
      return res.status(404).json({ error: "এই আইডিতে কোনো অর্ডার পাওয়া যায়নি।" });
    }

    return res.json({ order });
  } catch (err) {
    return next(err);
  }
}
