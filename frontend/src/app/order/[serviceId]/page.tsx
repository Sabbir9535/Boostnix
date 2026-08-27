import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceById } from "@/lib/api";
import { ApiRequestError } from "@/lib/api";
import OrderForm from "@/components/OrderForm";

export const metadata = { title: "অর্ডার — Boostnix" };

export default async function OrderPage({ params }: { params: { serviceId: string } }) {
  try {
    const { service } = await getServiceById(params.serviceId);

    return (
      <div className="container-page py-16 sm:py-20">
        <Link href="/services" className="text-sm font-medium text-ink/50 hover:text-ink">
          ← সার্ভিস তালিকায় ফিরুন
        </Link>

        <div className="mt-4 max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-signaldim">
            {service.category === "Facebook" ? "ফেসবুক" : service.category === "Instagram" ? "ইনস্টাগ্রাম" : service.category === "YouTube" ? "ইউটিউব" : service.category}
          </span>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
            {service.name}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">আপনার প্রয়োজনীয় quantity লিখুন এবং অর্ডারের আগে মোট মূল্য দেখে নিন।</p>
        </div>

        <div className="mt-10 max-w-xl">
          <OrderForm service={service} />
        </div>
      </div>
    );
  } catch (err) {
    if (err instanceof ApiRequestError) {
      notFound();
    }
    throw err;
  }
}
