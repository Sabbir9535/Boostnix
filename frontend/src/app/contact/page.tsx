export const metadata = { title: "যোগাযোগ — Upsurge" };

export default function ContactPage() {
  return (
    <div className="container-page py-16 sm:py-20">
      <div className="max-w-xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-signaldim">
          Contact
        </span>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
          অর্ডার নিয়ে কোনো প্রশ্ন আছে?
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          প্রতিটি অর্ডার ম্যানুয়ালি যাচাই করা হয়। দ্রুত সাহায্যের জন্য আপনার অর্ডার আইডি দিয়ে যোগাযোগ করুন।
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white p-6">
          <h2 className="font-display text-base font-semibold text-ink">Email</h2>
          <p className="mt-2 text-sm text-muted">zaco.com.bd@gmail.com</p>
        </div>
        <div className="rounded-2xl border border-line bg-white p-6">
          <h2 className="font-display text-base font-semibold text-ink">WhatsApp</h2>
          <p className="mt-2 text-sm text-muted">+880 1305054868</p>
        </div>
      </div>

      <p className="mt-8 max-w-lg text-sm leading-relaxed text-muted">
        সাপোর্ট পেতে ইমেইল বা হোয়াটসঅ্যাপে আপনার অর্ডার আইডি পাঠান।
      </p>
    </div>
  );
}
