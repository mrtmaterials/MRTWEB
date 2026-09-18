"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";

import { salesEmail } from "@/data/company";

type FormLabels = {
  company: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  product: string;
  grade: string;
  quantity: string;
  deliveryDate: string;
  message: string;
  submit: string;
  required: string;
  honeypot: string;
  fileNote: string;
  success: string;
  error: string;
};

type RfqFormProps = {
  defaultProduct?: string;
  labels: FormLabels;
  locale: "en" | "vi";
};

const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

export function RfqForm({ defaultProduct = "", labels, locale }: RfqFormProps) {
  const searchParams = useSearchParams();
  const initialProduct = defaultProduct || searchParams.get("product") || "";
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      setStatus("error");
      return;
    }

    const data = new FormData(form);
    if (data.get("website")) return;

    if (endpoint) {
      setStatus("sending");
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error("Form endpoint rejected the request");
        form.reset();
        setStatus("success");
      } catch {
        setStatus("error");
      }
      return;
    }

    const lines = Array.from(data.entries())
      .filter(([key, value]) => key !== "website" && String(value).trim())
      .map(([key, value]) => `${key}: ${String(value)}`)
      .join("\n");
    const material = String(data.get(labels.product) || initialProduct || "RFQ");
    const subject = locale === "vi" ? `Yêu cầu báo giá — ${material}` : `Request for quote — ${material}`;
    window.location.href = `mailto:${salesEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines)}`;
    setStatus("success");
  }

  const fields = [
    { name: labels.company, label: labels.company, required: true, autoComplete: "organization" },
    { name: labels.contactPerson, label: labels.contactPerson, required: true, autoComplete: "name" },
    { name: labels.email, label: labels.email, required: true, type: "email", autoComplete: "email" },
    { name: labels.phone, label: labels.phone, autoComplete: "tel" },
    { name: labels.country, label: labels.country, autoComplete: "country-name" },
    { name: labels.product, label: labels.product, required: true, defaultValue: initialProduct },
    { name: labels.grade, label: labels.grade },
    { name: labels.quantity, label: labels.quantity },
    { name: labels.deliveryDate, label: labels.deliveryDate, type: "date" },
  ];

  return (
    <form className="grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit} noValidate>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">{labels.honeypot}</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {fields.map((field) => (
        <label className="grid gap-2 text-sm font-semibold text-[var(--ink)]" key={field.name}>
          <span>
            {field.label}
            {field.required ? <span className="ml-1 text-[var(--green-600)]" aria-label={labels.required}>*</span> : null}
          </span>
          <input
            autoComplete={field.autoComplete}
            className="min-h-13 rounded-2xl bg-white px-4 text-base font-normal text-[var(--ink)] ring-1 ring-inset ring-[var(--line)] transition focus:ring-2 focus:ring-[var(--green-600)] focus:outline-none"
            defaultValue={field.defaultValue}
            name={field.name}
            required={field.required}
            type={field.type ?? "text"}
          />
        </label>
      ))}
      <label className="grid gap-2 text-sm font-semibold text-[var(--ink)] sm:col-span-2">
        <span>{labels.message}</span>
        <textarea className="min-h-36 resize-y rounded-2xl bg-white p-4 text-base font-normal text-[var(--ink)] ring-1 ring-inset ring-[var(--line)] transition focus:ring-2 focus:ring-[var(--green-600)] focus:outline-none" name={labels.message} />
      </label>
      <p className="text-sm leading-6 text-[var(--muted)] sm:col-span-2">{labels.fileNote}</p>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button className="min-h-12 rounded-full bg-[var(--green-700)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--ink)] disabled:cursor-wait disabled:opacity-60" disabled={status === "sending"} type="submit">
          {labels.submit}
        </button>
        <p aria-live="polite" className={`text-sm ${status === "error" ? "text-red-700" : "text-[var(--green-600)]"}`}>
          {status === "success" ? labels.success : status === "error" ? labels.error : ""}
        </p>
      </div>
    </form>
  );
}
