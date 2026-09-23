"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";

import { company, salesEmail } from "@/data/company";

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
  attachment: string;
  success: string;
  error: string;
};

type RfqFormProps = {
  defaultProduct?: string;
  labels: FormLabels;
  locale: "en" | "vi";
};

const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || `https://formsubmit.co/ajax/${salesEmail}`;
const acceptedFiles = ".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png";
const maxAttachmentBytes = 10 * 1024 * 1024;

export function RfqForm({ defaultProduct = "", labels, locale }: RfqFormProps) {
  const searchParams = useSearchParams();
  const initialProduct = defaultProduct || searchParams.get("product") || "";
  const requestType = searchParams.get("request");
  const initialMessage = requestType === "documents"
    ? (locale === "vi" ? "Tôi muốn yêu cầu COA, TDS, SDS hoặc tài liệu hiện có cho nguyên liệu này." : "I would like to request the available COA, TDS, SDS or supporting documents for this material.")
    : requestType === "sample"
      ? (locale === "vi" ? "Tôi muốn kiểm tra khả năng cung cấp mẫu cho nguyên liệu này." : "I would like to check sample availability for this material.")
      : "";
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
    if (data.get("_honey")) return;

    const attachments = data.getAll("attachments").filter((value): value is File => value instanceof File && value.size > 0);
    if (attachments.length > 5 || attachments.reduce((total, file) => total + file.size, 0) > maxAttachmentBytes) {
      setStatus("error");
      return;
    }

    const material = String(data.get("product") || initialProduct || "RFQ");
    data.set("_subject", locale === "vi" ? `Yêu cầu báo giá — ${material}` : `Request for quote — ${material}`);
    data.set("_template", "table");
    data.set("_url", `${company.url}/${locale}/contact`);

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
  }

  const fields = [
    { name: "company", label: labels.company, required: true, autoComplete: "organization" },
    { name: "contact_person", label: labels.contactPerson, required: true, autoComplete: "name" },
    { name: "email", label: labels.email, required: true, type: "email", autoComplete: "email" },
    { name: "phone", label: labels.phone, autoComplete: "tel" },
    { name: "country", label: labels.country, autoComplete: "country-name" },
    { name: "product", label: labels.product, required: true, defaultValue: initialProduct },
    { name: "grade_specification", label: labels.grade },
    { name: "quantity", label: labels.quantity },
    { name: "target_delivery_date", label: labels.deliveryDate, type: "date" },
  ];

  return (
    <form action={endpoint} className="grid min-w-0 gap-5 sm:grid-cols-2" encType="multipart/form-data" method="POST" onSubmit={handleSubmit} noValidate>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="_honey">{labels.honeypot}</label>
        <input id="_honey" name="_honey" tabIndex={-1} autoComplete="off" />
      </div>
      {fields.map((field) => (
        <label className="grid gap-2 text-sm font-semibold text-[var(--ink)]" key={field.name}>
          <span>
            {field.label}
            {field.required ? <span className="ml-1 text-[var(--green-600)]" aria-label={labels.required}>*</span> : null}
          </span>
          <input
            autoComplete={field.autoComplete}
            className="min-h-13 w-full min-w-0 rounded-2xl bg-white px-4 text-base font-normal text-[var(--ink)] ring-1 ring-inset ring-[var(--line)] transition focus:ring-2 focus:ring-[var(--green-600)] focus:outline-none"
            defaultValue={field.defaultValue}
            name={field.name}
            required={field.required}
            type={field.type ?? "text"}
          />
        </label>
      ))}
      <label className="grid gap-2 text-sm font-semibold text-[var(--ink)] sm:col-span-2">
        <span>{labels.message}</span>
        <textarea className="min-h-36 w-full min-w-0 resize-y rounded-2xl bg-white p-4 text-base font-normal text-[var(--ink)] ring-1 ring-inset ring-[var(--line)] transition focus:ring-2 focus:ring-[var(--green-600)] focus:outline-none" defaultValue={initialMessage} name="message" />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-[var(--ink)] sm:col-span-2">
        <span>{labels.attachment}</span>
        <input accept={acceptedFiles} className="min-h-13 w-full min-w-0 max-w-full rounded-2xl bg-white px-4 py-3 text-sm font-normal text-[var(--muted)] ring-1 ring-inset ring-[var(--line)] file:mr-4 file:rounded-full file:border-0 file:bg-[var(--green-50)] file:px-4 file:py-2 file:font-semibold file:text-[var(--green-600)]" multiple name="attachments" type="file" />
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
