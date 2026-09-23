"use client";

import { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Subscription error", err);
      setStatus("error");
      setErrorMessage("Failed to connect. Please check your network and try again.");
    }
  };

  return (
    <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-16 sm:py-20 border-t border-slate-200 no-print">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white border border-slate-200 p-8 sm:p-12 shadow-md relative overflow-hidden">
          <div className="absolute -top-12 -right-12 h-36 w-36 rounded-full bg-[var(--gold)]/5 blur-2xl" />
          <div className="absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-blue-500/5 blur-2xl" />

          <span className="inline-block rounded-full bg-[var(--gold)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--gold)] mb-4 select-none">
            Weekly Restock Reminder
          </span>
          <h2 className="text-2xl font-bold text-[var(--slate-900)] sm:text-3xl">
            Never Run Out Mid-Service Again
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-[var(--slate-500)] leading-relaxed">
            Join other church administrators and media professionals who receive a brief restock reminder list at the end of every month. No spam, just pure utility.
          </p>

          {status === "success" ? (
            <div className="mt-8 rounded-xl bg-green-50 border border-green-200 p-6 text-center animate-in fade-in zoom-in-95 duration-200">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="mt-4 text-sm font-semibold text-green-800">You are subscribed!</h3>
              <p className="mt-1 text-xs text-green-600">
                We will send you a reminder just before the final Sunday of the month.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 mx-auto max-w-md">
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="Enter your ministry email..."
                  required
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-[var(--slate-800)] placeholder-slate-400 outline-none transition-all focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]"
                  disabled={status === "loading"}
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center rounded-lg bg-[var(--navy)] px-5 py-3 text-sm font-semibold text-white cursor-pointer shadow-sm transition-all hover:bg-[var(--navy-dark)] hover:shadow active:scale-[0.98] disabled:opacity-50 select-none min-w-[120px]"
                >
                  {status === "loading" ? "Subscribing..." : "Notify Me"}
                </button>
              </div>

              {status === "error" && (
                <p className="mt-3 text-left text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1 duration-150">
                  {errorMessage}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
