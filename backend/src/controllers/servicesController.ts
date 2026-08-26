import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";

// GET /api/services
// Returns all active services, grouped implicitly by category (frontend groups client-side).
export async function getServices(_req: Request, res: Response, next: NextFunction) {
  try {
    const services = await prisma.service.findMany({
      where: { status: "ACTIVE" },
      orderBy: [{ category: "asc" }, { price: "asc" }],
    });
    return res.json({ services });
  } catch (err) {
    return next(err);
  }
}

// GET /api/services/:id
export async function getServiceById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const service = await prisma.service.findUnique({ where: { id } });
    if (!service || service.status !== "ACTIVE") {
      return res.status(404).json({ error: "Service not found" });
    }
    return res.json({ service });
  } catch (err) {
    return next(err);
  }
}
