"use client";

import Link from "next/link";
import { useState } from "react";
import GrowthMark from "./GrowthMark";

const links = [
  { href: "/", label: "হোম" },
  { href: "/services", label: "সার্ভিস" },
  { href: "/how-it-works", label: "কীভাবে করবেন" },
  { href: "/track", label: "অর্ডার ট্র্যাক" },
  { href: "/contact", label: "যোগাযোগ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <GrowthMark />
          <span className="font-display text-lg font-semibold tracking-tight">Upsurge</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink/70 transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/services"
          className="hidden rounded-full bg-ink px-5 py-2 text-sm font-semibold text-paper transition-transform hover:scale-[1.03] md:inline-block"
        >
          অর্ডার করুন
        </Link>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-md border border-line md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">মেনু</span>
          <div className="space-y-1.5">
            <span className="block h-[2px] w-5 bg-ink" />
            <span className="block h-[2px] w-5 bg-ink" />
            <span className="block h-[2px] w-5 bg-ink" />
          </div>
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-paper md:hidden">
          <div className="container-page flex flex-col py-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-line/60 py-3 text-sm font-medium text-ink/80 last:border-none"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/services"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-ink px-5 py-2.5 text-center text-sm font-semibold text-paper"
            >
              অর্ডার করুন
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
