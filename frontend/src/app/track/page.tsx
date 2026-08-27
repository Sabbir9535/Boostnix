import TrackOrderForm from "@/components/TrackOrderForm";

export const metadata = { title: "অর্ডার ট্র্যাক — Boostnix" };

export default function TrackPage({
  searchParams,
}: {
  searchParams: { orderNumber?: string };
}) {
  return (
    <div className="container-page py-16 sm:py-20">
      <div className="mx-auto max-w-xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-signaldim">
          অর্ডার ট্র্যাক
        </span>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
          আপনার অর্ডারের অবস্থা দেখুন
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          অর্ডার করার পর পাওয়া অর্ডার আইডি লিখুন। কোনো অ্যাকাউন্টের প্রয়োজন নেই।
        </p>

        <div className="mt-10">
          <TrackOrderForm defaultOrderNumber={searchParams.orderNumber} />
        </div>
      </div>
    </div>
  );
}
