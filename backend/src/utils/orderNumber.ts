import { prisma } from "../lib/prisma";

const PREFIX = "ORD-";
const START = 10000;

/**
 * Generates the next sequential order number, e.g. ORD-10001.
 * Looks at the highest existing order number and increments it.
 * Not perfectly race-proof under very high concurrency, but more
 * than sufficient for a manually-fulfilled, low-volume order flow.
 */
export async function generateOrderNumber(): Promise<string> {
  const last = await prisma.order.findFirst({
    orderBy: { createdAt: "desc" },
    select: { orderNumber: true },
  });

  if (!last) {
    return `${PREFIX}${START + 1}`;
  }

  const lastNumber = parseInt(last.orderNumber.replace(PREFIX, ""), 10);
  const next = Number.isFinite(lastNumber) ? lastNumber + 1 : START + 1;
  return `${PREFIX}${next}`;
}
