"use client";

import { useState } from "react";
import { ApiRequestError, trackOrder } from "@/lib/api";
import { TrackedOrder } from "@/types";

const statusSteps: TrackedOrder["status"][] = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "COMPLETED",
];

const statusLabels: Record<TrackedOrder["status"], string> = {
  PENDING: "অপেক্ষমাণ",
  CONFIRMED: "নিশ্চিত",
  PROCESSING: "প্রসেসিং",
  COMPLETED: "সম্পন্ন",
  CANCELLED: "বাতিল",
};

export default function TrackOrderForm({ defaultOrderNumber }: { defaultOrderNumber?: string }) {
  const [orderId, setOrderId] = useState(defaultOrderNumber ?? "");
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!orderId.trim()) return;
    setLoading(true);
    setError(null);
    setOrder(null);
    try {
      const { order } = await trackOrder(orderId.trim());
      setOrder(order);
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="যেমন: ORD-10001"
          className="input flex-1 font-mono"
          aria-label="অর্ডার আইডি"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-ink px-7 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-signal hover:text-ink disabled:opacity-60"
        >
          {loading ? "খোঁজা হচ্ছে…" : "অর্ডার ট্র্যাক করুন"}
        </button>
      </form>

      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {order && (
        <div className="mt-8 rounded-2xl border border-line bg-white p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono text-lg font-semibold text-ink">#{order.orderNumber}</span>
            <StatusBadge status={order.status} />
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-y-4 text-sm sm:grid-cols-3">
            <Detail label="সার্ভিস" value={order.serviceName} />
            <Detail label="পরিমাণ" value={order.quantity.toLocaleString()} />
            <Detail label="মূল্য" value={`৳${Number(order.amount).toFixed(2)}`} />
            <Detail label="অর্ডারের তারিখ" value={new Date(order.createdAt).toLocaleDateString("bn-BD")} />
          </dl>

          {order.status !== "CANCELLED" && (
            <div className="mt-8">
              <ProgressBar status={order.status} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-muted">{label}</dt>
      <dd className="mt-1 font-medium text-ink">{value}</dd>
    </div>
  );
}

function StatusBadge({ status }: { status: TrackedOrder["status"] }) {
  const styles: Record<TrackedOrder["status"], string> = {
    PENDING: "bg-ink/5 text-ink/60",
    CONFIRMED: "bg-violet/10 text-violet",
    PROCESSING: "bg-violet/10 text-violet",
    COMPLETED: "bg-signal/15 text-signaldim",
    CANCELLED: "bg-red-50 text-red-600",
  };
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${styles[status]}`}>
      {statusLabels[status]}
    </span>
  );
}

function ProgressBar({ status }: { status: TrackedOrder["status"] }) {
  const currentIndex = statusSteps.indexOf(status);
  return (
    <div className="flex items-center">
      {statusSteps.map((step, i) => (
        <div key={step} className="flex flex-1 items-center last:flex-none">
          <div className="flex flex-col items-center gap-2">
            <div
              className={`h-2.5 w-2.5 rounded-full ${
                i <= currentIndex ? "bg-signal" : "bg-line"
              }`}
            />
            <span className="text-[10px] uppercase tracking-wide text-muted">{statusLabels[step]}</span>
          </div>
          {i < statusSteps.length - 1 && (
            <div className={`mx-2 h-[2px] flex-1 ${i < currentIndex ? "bg-signal" : "bg-line"}`} />
          )}
        </div>
      ))}
    </div>
  );
}
