import rateLimit from "express-rate-limit";

// General API limiter — generous, just to blunt abuse/scraping.
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again later." },
});

// Stricter limiter specifically for order creation, to prevent spam orders.
export const orderCreateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many orders submitted from this device. Please try again later or contact support." },
});

// Limiter for order tracking lookups, to prevent order-number enumeration.
export const orderLookupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many tracking attempts. Please try again later." },
});
