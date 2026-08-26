import Link from "next/link";
import GrowthMark from "./GrowthMark";

export default function Footer() {
  return (
    <footer className="border-t border-nightline bg-night text-paper/80">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <GrowthMark />
            <span className="font-display text-lg font-semibold text-paper">Boostnix</span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/60">
            সহজে ফলোয়ার, লাইক ও ভিউ অর্ডার করুন। কোনো অ্যাকাউন্টের প্রয়োজন নেই।
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold text-paper">নেভিগেশন</h3>
          <ul className="mt-4 space-y-2 text-sm text-paper/60">
            <li><Link href="/services" className="hover:text-signal">সার্ভিস</Link></li>
            <li><Link href="/how-it-works" className="hover:text-signal">কীভাবে করবেন</Link></li>
            <li><Link href="/track" className="hover:text-signal">অর্ডার ট্র্যাক</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold text-paper">সাপোর্ট</h3>
          <ul className="mt-4 space-y-2 text-sm text-paper/60">
            <li><Link href="/contact" className="hover:text-signal">যোগাযোগ করুন</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold text-paper">পেমেন্ট মাধ্যম</h3>
          <p className="mt-4 text-sm text-paper/60">bKash · Nagad · Rocket · Bank Transfer</p>
        </div>
      </div>

      <div className="border-t border-nightline">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Boostnix. All rights reserved.</span>
          <span>পেমেন্ট যাচাইয়ের পর প্রতিটি অর্ডার ম্যানুয়ালি সম্পন্ন করা হয়।</span>
        </div>
      </div>
    </footer>
  );
}
