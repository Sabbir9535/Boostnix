import { ApiErrorBody, OrderCreateResponse, Service, TrackedOrder } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

export class ApiRequestError extends Error {
  details?: ApiErrorBody["details"];
  constructor(message: string, details?: ApiErrorBody["details"]) {
    super(message);
    this.details = details;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
    cache: "no-store",
  });

  if (!res.ok) {
    let body: ApiErrorBody = { error: "সমস্যা হয়েছে। আবার চেষ্টা করুন।" };
    try {
      body = await res.json();
    } catch {
      // response had no JSON body — fall back to the default message above
    }
    throw new ApiRequestError(body.error, body.details);
  }

  return res.json() as Promise<T>;
}

export function getServices() {
  return request<{ services: Service[] }>("/services");
}

export function getServiceById(id: string) {
  return request<{ service: Service }>(`/services/${id}`);
}

export interface CreateOrderPayload {
  customerName: string;
  phone: string;
  email?: string;
  serviceId: string;
  quantity: number;
  socialLink: string;
  paymentMethod: string;
  transactionId: string;
  customerNote?: string;
}

export function createOrder(payload: CreateOrderPayload) {
  return request<OrderCreateResponse>("/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function trackOrder(orderNumber: string) {
  return request<{ order: TrackedOrder }>(`/orders/${encodeURIComponent(orderNumber)}`);
}
