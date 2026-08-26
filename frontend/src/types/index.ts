export type ServiceStatus = "ACTIVE" | "INACTIVE";

export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  quantity: number;
  price: string; // Prisma Decimal is serialized as a string over JSON
  pricePerUnit?: string;
  status: ServiceStatus;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = "PENDING" | "CONFIRMED" | "PROCESSING" | "COMPLETED" | "CANCELLED";

export interface OrderCreateResponse {
  orderNumber: string;
  status: OrderStatus;
  serviceName: string;
  quantity: number;
  amount: string;
  createdAt: string;
}

export interface TrackedOrder {
  orderNumber: string;
  serviceName: string;
  quantity: number;
  amount: string;
  status: OrderStatus;
  createdAt: string;
}

export interface ApiErrorBody {
  error: string;
  details?: { field: string; message: string }[];
}
