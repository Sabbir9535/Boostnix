import Link from "next/link";
import GrowthMark from "@/components/GrowthMark";
import { getServices } from "@/lib/api";
import ServiceCard from "@/components/ServiceCard";
import { Service } from "@/types";

const platforms = [
  { name: "ফেসবুক", mark: "f", color: "bg-[#1877f2]", services: ["ফলোয়ার", "পেজ লাইক", "পোস্ট লাইক", "ভিডিও ভিউ"] },
  { name: "ইনস্টাগ্রাম", mark: "◎", color: "bg-[#d62976]", services: ["ফলোয়ার", "লাইক", "রিল ভিউ"] },
  { name: "ইউটিউব", mark: "▶", color: "bg-[#ff0000]", services: ["সাবস্ক্রাইবার", "ভিডিও ভিউ"] },
];

const steps = [
  { label: "সার্ভিস বেছে নিন", detail: "আপনার পছন্দের প্ল্যাটফর্ম ও সার্ভিস নির্বাচন করুন।" },
  { label: "লিংক দিন", detail: "যে প্রোফাইলে সার্ভিস নিতে চান তার লিংক দিন।" },
  { label: "পেমেন্ট নিশ্চিত করুন", detail: "সেন্ড মানি করে ট্রানজেকশন আইডি লিখুন।" },
  { label: "আমরা কাজ শুরু করব", detail: "পেমেন্ট যাচাই করে আপনার অর্ডার সম্পন্ন করা হবে।" },
];

export default async function HomePage() {
  let services: Service[] = [];
  try {
    const data = await getServices();
    services = data.services.filter(
      (service, index, list) => list.findIndex((item) => item.category === service.category && item.name === service.name) === index
    ).slice(0, 6);
  } catch {
    services = [];
  }

  return (
    <>
      <section className="border-b border-line bg-white">
        <div className="container-page flex items-center justify-between py-2 text-xs text-muted">
          <span>বাংলাদেশের দ্রুত ও নির্ভরযোগ্য সোশ্যাল মিডিয়া সার্ভিস</span>
          <Link href="/track" className="font-semibold text-signaldim hover:text-ink">অর্ডার ট্র্যাক করুন →</Link>
        </div>
      </section>

      <section className="relative overflow-hidden bg-night text-paper">
        <div className="container-page relative z-10 grid gap-12 py-20 sm:grid-cols-[1.1fr_0.9fr] sm:items-center sm:py-28">
          <div>
            <div className="mb-7 flex items-center gap-3 text-sm font-semibold text-signal"><GrowthMark /> Boostnix-এ স্বাগতম</div>
            <h1 className="max-w-2xl font-display text-4xl font-bold leading-[1.12] sm:text-6xl">আপনার সোশ্যাল মিডিয়া গ্রোথ শুরু হোক আজই</h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-paper/65 sm:text-lg">ফেসবুক, ইনস্টাগ্রাম ও ইউটিউবের জন্য সহজ, দ্রুত এবং নিরাপদ সার্ভিস। পছন্দের প্যাকেজ বেছে নিয়ে কয়েক মিনিটেই অর্ডার করুন।</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/services" className="rounded-lg bg-signal px-6 py-3 text-sm font-bold text-night transition-transform hover:-translate-y-0.5">সার্ভিস দেখুন</Link>
              <Link href="/how-it-works" className="rounded-lg border border-paper/20 px-6 py-3 text-sm font-semibold text-paper hover:border-paper/50">কীভাবে করবেন</Link>
            </div>
          </div>
          <div className="relative rounded-3xl border border-paper/10 bg-paper/[0.06] p-5 shadow-2xl backdrop-blur sm:p-7">
            <div className="flex items-center justify-between border-b border-paper/10 pb-4"><span className="text-sm font-semibold">জনপ্রিয় প্ল্যাটফর্ম</span><span className="rounded-full bg-signal/15 px-3 py-1 text-xs text-signal">সক্রিয়</span></div>
            <div className="mt-5 space-y-3">{platforms.map((platform) => <div key={platform.name} className="flex items-center justify-between rounded-xl bg-white/[0.08] p-4"><span className="flex items-center gap-3"><span className={`flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold text-white ${platform.color}`}>{platform.mark}</span><span className="font-semibold">{platform.name}</span></span><span className="text-xs text-paper/50">{platform.services.length} সার্ভিস →</span></div>)}</div>
          </div>
        </div>
      </section>

      <section className="container-page py-20 sm:py-28">
        <div className="mb-8 flex items-end justify-between gap-5"><div><span className="text-xs font-bold tracking-widest text-signaldim">জনপ্রিয় সার্ভিস</span><h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">আপনার প্রয়োজনের সার্ভিস বেছে নিন</h2></div><Link href="/services" className="text-sm font-semibold text-signaldim hover:text-ink">সব সার্ভিস →</Link></div>
        {services.length > 0 && <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{services.map((service) => <ServiceCard key={`${service.category}-${service.name}`} service={service} />)}</div>}

        <div className="mt-24 grid gap-5 sm:grid-cols-3">
          {platforms.map((platform) => (
            <div key={platform.name} className="rounded-2xl border border-line bg-white p-6">
              <div className="flex items-center gap-3">
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl font-bold text-white ${platform.color}`}>{platform.mark}</span>
                <h2 className="font-display text-xl font-semibold text-ink">{platform.name}</h2>
              </div>
              <ul className="mt-5 space-y-2 text-sm text-muted">
                {platform.services.map((service) => <li key={service}>✓ {platform.name} {service}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-24 mb-12 flex items-end justify-between gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-signaldim">
              যেভাবে করবেন
            </span>
            <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
              চারটি সহজ ধাপে অর্ডার
            </h2>
          </div>
          <Link href="/how-it-works" className="hidden text-sm font-semibold text-ink/60 hover:text-ink sm:block">
            বিস্তারিত দেখুন →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.label} className="rounded-2xl border border-line bg-white p-6">
              <span className="font-mono text-xs text-signaldim">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-display text-base font-semibold text-ink">{s.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-night2">
        <div className="container-page flex flex-col items-start gap-6 py-20 text-paper sm:flex-row sm:items-center sm:justify-between sm:py-16">
          <div>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              আজই আপনার পেজের উন্নতি শুরু করুন
            </h2>
            <p className="mt-2 max-w-md text-sm text-paper/60">
              পছন্দের সার্ভিস বেছে নিয়ে কয়েক মিনিটেই অর্ডার সম্পন্ন করুন।
            </p>
          </div>
          <Link
            href="/services"
            className="rounded-full bg-signal px-7 py-3 text-sm font-semibold text-night transition-transform hover:scale-[1.03]"
          >
            সার্ভিস দেখুন
          </Link>
        </div>
      </section>
    </>
  );
}
