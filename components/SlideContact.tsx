"use client";

import type { CSSProperties, Dispatch, SetStateAction } from "react";
import { Slide } from "./Slide";

export interface ContactFormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

export const EMPTY_CONTACT_FORM: ContactFormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
};

interface SlideContactProps {
  style: CSSProperties;
  formState: ContactFormState;
  setFormState: Dispatch<SetStateAction<ContactFormState>>;
  sent: boolean;
  setSent: (v: boolean) => void;
}

const CONTACT_FIELDS: {
  field: keyof Omit<ContactFormState, "message">;
  label: string;
  type: string;
  required?: boolean;
}[] = [
  { field: "name", label: "Full Name", type: "text", required: true },
  { field: "company", label: "Company", type: "text" },
  { field: "email", label: "Email", type: "email", required: true },
  { field: "phone", label: "Phone", type: "tel" },
];

const CONTACT_DETAILS: { label: string; value: string; accent?: boolean }[] = [
  { label: "Location", value: "Lagos, Nigeria" },
  { label: "Email", value: "hello@manifoldcomputers.com", accent: true },
  { label: "LinkedIn", value: "Manifold Computers Limited", accent: true },
];

export function SlideContact({
  style,
  formState,
  setFormState,
  sent,
  setSent,
}: SlideContactProps) {
  return (
    <Slide style={style}>
      {/* 
        FIX 1: Replaced max-w-275 with max-w-[1100px].
        FIX 2: Added overflow-y-auto so short mobile screens can scroll to the submit button.
      */}
      <div className="mx-auto flex h-full w-full max-w-[1100px] flex-col justify-between overflow-y-auto px-6 py-8 md:px-8 md:py-12 lg:overflow-visible">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-24">
          {/* Left Column: Text & Details */}
          <div className="flex flex-col justify-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#fd018b] md:mb-4 md:text-sm">
              Contact
            </p>
            <h2 className="mb-4 text-[clamp(40px,5vw,64px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-black md:mb-6">
              Let&apos;s Talk.
            </h2>
            <p className="mb-8 text-base leading-[1.8] text-[#666] md:mb-12 md:text-[17px]">
              Have a project, partnership or technology requirement? We&apos;d
              love to hear from you.
            </p>

            {/* Contact Details List */}
            <div className="flex flex-col gap-5 md:gap-8">
              {CONTACT_DETAILS.map((item) => (
                <div key={item.label}>
                  <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#999]">
                    {item.label}
                  </div>
                  <div
                    className={`text-[15px] font-medium md:text-base ${
                      item.accent ? "text-[#fd018b]" : "text-black"
                    }`}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Form or Success Message */}
          <div className="mt-4 flex flex-col justify-center lg:mt-0">
            {sent ? (
              /* FIX 3: Replaced min-h-87.5 with min-h-[350px] */
              <div className="flex h-full min-h-[350px] flex-col items-center justify-center rounded-2xl border border-[#eaeaea] bg-gray-50/50 p-8 text-center transition-all">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#fd018b]/10">
                  <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M3 9l4.5 4.5L15 5"
                      stroke="#FD018B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold tracking-tight text-black md:text-2xl">
                  Message Sent
                </h3>
                <p className="text-sm leading-relaxed text-[#666] md:text-base">
                  Thank you for reaching out. Our team will be in touch shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="flex w-full flex-col"
              >
                <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {CONTACT_FIELDS.map(({ field, label, type, required }) => (
                    <input
                      key={field}
                      type={type}
                      placeholder={label}
                      required={required}
                      value={formState[field]}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, [field]: e.target.value }))
                      }
                      className="w-full rounded-[7px] border border-[#eaeaea] bg-transparent px-4 py-3.5 text-[15px] text-black placeholder-[#999] outline-none transition-colors focus:border-[#fd018b] focus:bg-white"
                    />
                  ))}
                </div>
                <textarea
                  placeholder="Message"
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, message: e.target.value }))
                  }
                  className="mb-6 w-full resize-none rounded-[7px] border border-[#eaeaea] bg-transparent px-4 py-3.5 text-[15px] text-black placeholder-[#999] outline-none transition-colors focus:border-[#fd018b] focus:bg-white"
                />
                <button
                  type="submit"
                  className="w-full rounded-[7px] bg-[#fd018b] px-7 py-4 text-sm font-semibold tracking-[0.01em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(253,1,139,0.3)]"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[#eaeaea] pt-6 text-center sm:flex-row sm:text-left md:mt-16 md:pt-8">
          <span className="text-[13px] text-[#999]">
            © {new Date().getFullYear()} Manifold Computers Limited
          </span>
          <span className="text-[13px] font-medium text-black">
            Enterprise Technology. Built for Africa.
          </span>
        </div>
      </div>
    </Slide>
  );
}
