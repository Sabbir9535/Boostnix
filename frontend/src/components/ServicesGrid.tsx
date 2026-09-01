"use client";

import { useMemo, useState } from "react";
import { Service } from "@/types";
import ServiceCard from "./ServiceCard";

function localizedCategory(category: string) {
  return { Facebook: "ফেসবুক", Instagram: "ইনস্টাগ্রাম", TikTok: "টিকটক", YouTube: "ইউটিউব" }[category] ?? category;
}

export default function ServicesGrid({ services }: { services: Service[] }) {
  const categories = useMemo(() => {
    const set = new Set(services.map((s) => s.category));
    return ["সব", ...Array.from(set)];
  }, [services]);

  const [active, setActive] = useState("সব");

  const filtered = (active === "সব" ? services : services.filter((s) => s.category === active)).filter(
    (service, index, list) => list.findIndex((item) => item.category === service.category && item.name === service.name) === index
  );

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              active === c
                ? "border-ink bg-ink text-paper"
                : "border-line bg-white text-ink/70 hover:border-ink/40"
            }`}
          >
            {c === "সব" ? c : localizedCategory(c)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted">এই বিভাগে এখন কোনো সার্ভিস নেই।</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      )}
    </div>
  );
}
