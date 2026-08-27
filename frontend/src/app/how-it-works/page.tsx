import Link from "next/link";

export const metadata = { title: "কীভাবে করবেন — Boostnix" };

const steps = [
  {
    title: "সার্ভিস দেখুন",
    detail: "ফেসবুক, ইনস্টাগ্রাম ও ইউটিউব থেকে আপনার প্রয়োজনের সার্ভিস বেছে নিন।",
  },
  {
    title: "অর্ডার ফর্ম পূরণ করুন",
    detail:
      "আপনার নাম, মোবাইল নম্বর, প্রোফাইলের লিংক এবং কত ফলোয়ার চান তা লিখুন।",
  },
  {
    title: "পেমেন্ট করুন",
    detail:
      "পেমেন্ট করুন বিকাশ, নগদ, রকেট বা ব্যাংকের মাধ্যমে, তারপর অর্ডার ফর্মে ট্রানজেকশন আইডি দিন।",
  },
  {
    title: "যাচাই ও ডেলিভারি",
    detail:
      "আমাদের টিম পেমেন্ট যাচাই করে অর্ডার প্রসেস করবে। অর্ডার আইডি দিয়ে অবস্থা দেখুন।",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="container-page py-16 sm:py-20">
      <div className="max-w-xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-signaldim">
          কীভাবে করবেন
        </span>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
          সহজ, স্বচ্ছ ও নির্ভরযোগ্য
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          কোনো অ্যাকাউন্টের প্রয়োজন নেই। প্রতিটি অর্ডার আমাদের টিম যাচাই করে সম্পন্ন করে।
        </p>
      </div>

      <ol className="mt-12 space-y-8">
        {steps.map((s, i) => (
          <li key={s.title} className="flex gap-6 border-b border-line pb-8 last:border-none">
            <span className="font-mono text-2xl font-semibold text-signaldim">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h2 className="font-display text-lg font-semibold text-ink">{s.title}</h2>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">{s.detail}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-12">
        <Link
          href="/services"
          className="inline-block rounded-full bg-ink px-7 py-3 text-sm font-semibold text-paper transition-transform hover:scale-[1.03]"
        >
          সার্ভিস দেখুন
        </Link>
      </div>
    </div>
  );
}
