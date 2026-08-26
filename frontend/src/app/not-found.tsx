import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center py-32 text-center">
      <span className="font-mono text-sm text-signaldim">404</span>
      <h1 className="mt-3 font-display text-2xl font-semibold text-ink">পাতাটি পাওয়া যায়নি</h1>
      <p className="mt-2 max-w-sm text-sm text-muted">
        আপনি যে পেজ বা সার্ভিস খুঁজছেন সেটি নেই অথবা সরিয়ে ফেলা হয়েছে।
      </p>
      <Link
        href="/services"
        className="mt-8 rounded-full bg-ink px-7 py-3 text-sm font-semibold text-paper hover:bg-signal hover:text-ink"
      >
        সার্ভিস দেখুন
      </Link>
    </div>
  );
}
