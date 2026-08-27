import { getServices } from "@/lib/api";
import ServicesGrid from "@/components/ServicesGrid";

export const metadata = { title: "সার্ভিস — Boostnix" };

export default async function ServicesPage() {
  let services: Awaited<ReturnType<typeof getServices>>["services"] = [];
  let loadError: string | null = null;

  try {
    const data = await getServices();
    services = data.services;
  } catch {
    loadError = "এই মুহূর্তে সার্ভিস লোড করা যাচ্ছে না। একটু পর আবার চেষ্টা করুন।";
  }

  return (
    <div className="container-page py-16 sm:py-20">
      <div className="mb-10 max-w-xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-signaldim">
          সার্ভিস
        </span>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
          শুরু করতে একটি সার্ভিস বেছে নিন
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          নিচ থেকে প্ল্যাটফর্ম ও সার্ভিস বেছে নিন। পরের পাতায় প্যাকেজ নির্বাচন করে অর্ডার করুন।
        </p>
      </div>

      {loadError ? (
        <div className="rounded-2xl border border-line bg-white p-8 text-sm text-muted">
          {loadError}
        </div>
      ) : (
        <ServicesGrid services={services} />
      )}
    </div>
  );
}
