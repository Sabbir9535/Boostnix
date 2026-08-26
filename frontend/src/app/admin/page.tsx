"use client";

import { useState } from "react";

export default function AddServicePage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(e.currentTarget);
    const serviceData = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: formData.get("price"),
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceData),
      });

      if (response.ok) {
        setMessage("সার্ভিস সফলভাবে যোগ হয়েছে!");
        (e.target as HTMLFormElement).reset(); // Form clear kora
      } else {
        setMessage("সার্ভিস যোগ করা যায়নি। আবার চেষ্টা করুন।");
      }
    } catch (error) {
      setMessage("সমস্যা হয়েছে। সার্ভার সংযোগ পরীক্ষা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 tracking-tight">
          নতুন সার্ভিস যোগ করুন
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              সার্ভিসের নাম
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              placeholder="যেমন: ফেসবুক ফলোয়ার"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              মূল্য (৳)
            </label>
            <input
              type="number"
              name="price"
              step="0.01"
              required
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              বিবরণ
            </label>
            <textarea
              name="description"
              rows={4}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm resize-none"
              placeholder="সার্ভিসের বিবরণ লিখুন..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 rounded-lg transition-colors flex justify-center items-center gap-2 text-sm disabled:opacity-70"
          >
            {loading ? "যোগ হচ্ছে..." : "সার্ভিস যোগ করুন"}
          </button>
        </form>

        {message && (
          <div className={`mt-4 p-3 rounded-lg text-sm text-center ${
            message.includes("সফলভাবে") ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}