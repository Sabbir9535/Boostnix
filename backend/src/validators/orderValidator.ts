import { z } from "zod";

// Accepts a plausible http(s) URL for the social profile/page/post/video link.
const urlSchema = z
  .string()
  .trim()
  .min(1, "লিংক দেওয়া আবশ্যক")
  .max(500)
  .refine(
    (value) => {
      try {
        const parsed = new URL(value);
        return parsed.protocol === "http:" || parsed.protocol === "https:";
      } catch {
        return false;
      }
    },
    { message: "http:// অথবা https:// দিয়ে শুরু হওয়া সঠিক লিংক দিন" }
  );

export const createOrderSchema = z.object({
  customerName: z.string().trim().min(2, "আপনার নাম দেওয়া আবশ্যক").max(120),
  phone: z
    .string()
    .trim()
    .min(6, "সঠিক মোবাইল নম্বর দিন")
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, "মোবাইল নম্বরে ভুল অক্ষর আছে"),
  email: z
    .string()
    .trim()
    .email("সঠিক ইমেইল ঠিকানা দিন")
    .max(160)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  serviceId: z.string().uuid("ভুল সার্ভিস নির্বাচন করা হয়েছে"),
  quantity: z.coerce.number().int().positive().max(1_000_000),
  socialLink: urlSchema,
  paymentMethod: z.string().trim().min(2).max(50),
  transactionId: z
    .string()
    .trim()
    .min(3, "সঠিক ট্রানজেকশন আইডি দিন")
    .max(100)
    .regex(/^[a-zA-Z0-9\-_]+$/, "ট্রানজেকশন আইডিতে ভুল অক্ষর আছে"),
  customerNote: z.string().trim().max(500).optional().or(z.literal("").transform(() => undefined)),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

export const orderNumberParamSchema = z.object({
  orderNumber: z
    .string()
    .trim()
    .regex(/^ORD-\d+$/i, "অর্ডার আইডির ফরম্যাট সঠিক নয়"),
});
