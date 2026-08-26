import Link from "next/link";
import { Service } from "@/types";
import GrowthMark from "./GrowthMark";

const platformMarks: Record<string, { label: string; className: string }> = {
  Facebook: { label: "f", className: "bg-[#1877f2] text-white" },
  Instagram: { label: "◎", className: "bg-[#d62976] text-white" },
  TikTok: { label: "♪", className: "bg-[#111111] text-white" },
  YouTube: { label: "▶", className: "bg-[#ff0000] text-white" },
};

function localizedServiceName(service: Service) {
  if (service.name.includes("Followers")) return `${service.category === "Facebook" ? "ফেসবুক" : service.category === "Instagram" ? "ইনস্টাগ্রাম" : service.category === "YouTube" ? "ইউটিউব" : service.category} ফলোয়ার`;
  if (service.name.includes("Likes")) return `${service.category === "Facebook" ? "ফেসবুক" : "ইনস্টাগ্রাম"} লাইক`;
  if (service.name.includes("Views")) return `${service.category === "Facebook" ? "ফেসবুক" : service.category === "Instagram" ? "ইনস্টাগ্রাম" : "ইউটিউব"} ভিউ`;
  if (service.name.includes("Subscribers")) return "ইউটিউব সাবস্ক্রাইবার";
  return service.name;
}

function localizedCategory(category: string) {
  return { Facebook: "ফেসবুক", Instagram: "ইনস্টাগ্রাম", TikTok: "টিকটক", YouTube: "ইউটিউব" }[category] ?? category;
}

export default function ServiceCard({ service }: { service: Service }) {
  const mark = platformMarks[service.category] ?? { label: "★", className: "bg-ink text-paper" };

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-white p-6 transition-shadow hover:shadow-[0_8px_30px_-12px_rgba(16,18,31,0.15)]">
      <div className="pointer-events-none absolute right-6 top-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <GrowthMark heights={[14, 22, 30, 40]} barWidth={7} />
      </div>

      <div>
        <div className="flex items-center gap-3">
          <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl font-bold ${mark.className}`} aria-label={service.category}>
            {mark.label}
          </span>
          <span className="text-xs font-semibold text-ink/60">{localizedCategory(service.category)}</span>
        </div>
        <h3 className="mt-4 font-display text-lg font-semibold text-ink">{localizedServiceName(service)}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">সার্ভিসটি বেছে নিয়ে পরের পাতায় প্যাকেজ নির্বাচন করুন।</p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
        <Link
          href={`/order/${service.id}`}
          className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper transition-colors group-hover:bg-signal group-hover:text-ink"
        >
          সার্ভিস বেছে নিন →
        </Link>
      </div>
    </div>
  );
}
