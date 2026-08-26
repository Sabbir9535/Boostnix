import Link from "next/link";

export const metadata = { title: "অর্ডার জমা হয়েছে — Upsurge" };

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { orderNumber?: string };
}) {
  const orderNumber = searchParams.orderNumber;

  return (
    <div className="container-page flex flex-col items-center py-24 text-center sm:py-32">
      <div className="flex items-center gap-1.5 rounded-full bg-signal/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-signaldim">
        অর্ডার জমা হয়েছে
      </div>

      <h1 className="mt-6 max-w-lg font-display text-3xl font-semibold text-ink sm:text-4xl">
        আপনার অর্ডার সফলভাবে জমা হয়েছে
      </h1>

      {orderNumber ? (
        <>
          <p className="mt-4 text-sm text-muted">আপনার অর্ডার আইডি</p>
          <p className="mt-1 font-mono text-3xl font-semibold text-ink">#{orderNumber}</p>

          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-ink/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink/60">
            অবস্থা: অপেক্ষমাণ
          </div>

          <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted">
            অর্ডার আইডিটি সংরক্ষণ করুন। পেমেন্ট যাচাই হওয়ার পর আপনার অর্ডার প্রসেস করা হবে।
          </p>
        </>
      ) : (
        <p className="mt-4 max-w-sm text-sm text-muted">
          এই পাতায় কোনো অর্ডার আইডি পাওয়া যায়নি। অর্ডার করার পর পাওয়া কনফার্মেশনটি দেখুন।
        </p>
      )}

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        {orderNumber && (
          <Link
            href={`/track?orderNumber=${encodeURIComponent(orderNumber)}`}
            className="rounded-full bg-ink px-7 py-3 text-sm font-semibold text-paper transition-transform hover:scale-[1.03]"
          >
            এই অর্ডার ট্র্যাক করুন
          </Link>
        )}
        <Link
          href="/services"
          className="rounded-full border border-line px-7 py-3 text-sm font-semibold text-ink/70 hover:border-ink/40 hover:text-ink"
        >
          আরও সার্ভিস দেখুন
        </Link>
      </div>
    </div>
  );
}
