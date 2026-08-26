"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Service } from "@/types";
import { ApiRequestError, createOrder } from "@/lib/api";

const paymentMethods = ["bKash", "Nagad", "Rocket", "ব্যাংক ট্রান্সফার"];
const paymentNumber = process.env.NEXT_PUBLIC_PAYMENT_NUMBER ?? "01XXXXXXXXX";
const fixedFollowerLikeRate = 0.0605;

type FieldErrors = Record<string, string>;

export default function OrderForm({ service }: { service: Service }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [quantity, setQuantity] = useState(String(service.quantity));
  const usesFixedRate = /followers|likes|subscribers/i.test(service.name);
  const pricePerUnit = usesFixedRate
    ? fixedFollowerLikeRate
    : Number(service.pricePerUnit ?? Number(service.price) / service.quantity);
  const numericQuantity = Number(quantity);
  const totalAmount = numericQuantity * pricePerUnit;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    setFieldErrors({});

    const form = new FormData(e.currentTarget);
    const payload = {
      customerName: String(form.get("customerName") ?? ""),
      phone: String(form.get("phone") ?? ""),
      email: String(form.get("email") ?? "") || undefined,
      serviceId: service.id,
      quantity: numericQuantity,
      socialLink: String(form.get("socialLink") ?? ""),
      paymentMethod: String(form.get("paymentMethod") ?? ""),
      transactionId: String(form.get("transactionId") ?? ""),
      customerNote: String(form.get("customerNote") ?? "") || undefined,
    };

    try {
      const result = await createOrder(payload);
      router.push(`/success?orderNumber=${encodeURIComponent(result.orderNumber)}`);
    } catch (err) {
      if (err instanceof ApiRequestError) {
        setFormError(err.message);
        if (err.details) {
          const next: FieldErrors = {};
          for (const d of err.details) next[d.field] = d.message;
          setFieldErrors(next);
        }
      } else {
        setFormError("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <fieldset className="space-y-5">
        <legend className="font-display text-lg font-semibold text-ink">আপনার তথ্য</legend>

        <Field label="আপনার নাম" name="customerName" required error={fieldErrors.customerName}>
          <input
            name="customerName"
            required
            minLength={2}
            className="input"
            placeholder="আপনার নাম"
          />
        </Field>

        <Field label="মোবাইল নম্বর" name="phone" required error={fieldErrors.phone}>
          <input name="phone" required className="input" placeholder="01XXXXXXXXX" />
        </Field>

        <Field label="ইমেইল (ঐচ্ছিক)" name="email" error={fieldErrors.email}>
          <input name="email" type="email" className="input" placeholder="আপনার ইমেইল" />
        </Field>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="font-display text-lg font-semibold text-ink">পরিমাণ লিখুন</legend>

        <Field label="কতটি ফলোয়ার / লাইক / সাবস্ক্রাইবার নিতে চান?" name="quantity" required error={fieldErrors.quantity}>
          <input
            name="quantity"
            type="number"
            required
            min={1}
            max={1_000_000}
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            className="input"
            placeholder="যেমন: 1000"
          />
          <p className="mt-1 text-xs text-muted">
            প্রতি ইউনিট: ৳{pricePerUnit.toFixed(4)} | মোট: ৳{Number.isFinite(totalAmount) ? totalAmount.toFixed(2) : "0.00"}
          </p>
        </Field>

        <Field
          label="ফেসবুক / ইনস্টাগ্রাম / ইউটিউব লিংক"
          name="socialLink"
          required
          error={fieldErrors.socialLink}
        >
          <input
            name="socialLink"
            required
            type="url"
            className="input"
            placeholder="https://..."
          />
        </Field>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="font-display text-lg font-semibold text-ink">পেমেন্ট করুন</legend>

        <p className="rounded-xl border border-signal/30 bg-signal/10 p-4 text-sm text-ink/80">
          নিচের যেকোনো মাধ্যমে <strong>৳{Number.isFinite(totalAmount) ? totalAmount.toFixed(2) : "0.00"}</strong> সেন্ড মানি করুন। এরপর ট্রানজেকশন আইডি লিখুন।
        </p>

        <div className="rounded-xl border border-line bg-white p-4 text-sm leading-relaxed text-muted">
          <p><strong className="text-ink">পেমেন্ট নম্বর:</strong> {paymentNumber}</p>
          <p className="mt-2">১. নম্বরটিতে সেন্ড মানি করুন। ২. আপনার অ্যাপের কনফার্মেশন মেসেজ থেকে ট্রানজেকশন আইডি কপি করুন। ৩. নিচে মাধ্যম ও ট্রানজেকশন আইডি লিখে অর্ডার জমা দিন।</p>
        </div>

          <Field label="পেমেন্টের মাধ্যম" name="paymentMethod" required error={fieldErrors.paymentMethod}>
          <select name="paymentMethod" required className="input" defaultValue="">
            <option value="" disabled>
              পেমেন্টের মাধ্যম বেছে নিন
            </option>
            {paymentMethods.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </Field>

          <Field label="ট্রানজেকশন আইডি" name="transactionId" required error={fieldErrors.transactionId}>
          <input name="transactionId" required className="input" placeholder="যেমন: 8N7K2LQX93" />
        </Field>
      </fieldset>


      {formError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {formError}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-ink py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-signal hover:text-ink disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {submitting ? "জমা হচ্ছে…" : "অর্ডার জমা দিন"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  required,
  error,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink/80">
        {label} {required && <span className="text-signaldim">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
