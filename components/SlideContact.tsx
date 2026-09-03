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
  {
    label: "Location",
    value: "Leadway Marble House 1 Alfred Rewane Road Ikoyi Lagos, Nigeria",
  },
  { label: "Email", value: "reachus@manifoldcomputers.com", accent: true },
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
      <div className="mx-auto flex w-full max-w-[1000px] flex-col justify-between overflow-y-auto px-6 py-10 md:px-12 md:py-12 lg:h-full lg:overflow-visible">
        {/* Main Content Layout: Stacks strictly on mobile, side-by-side on Desktop (lg) */}
        <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-20">
          {/* Top/Left Section: Information */}
          <div className="flex w-full flex-col justify-start order-1">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#fd018b]">
              Contact
            </p>
            <h2 className="mb-5 text-[clamp(40px,5vw,68px)] font-extrabold leading-[1.02] tracking-[-0.04em] text-black">
              Let&apos;s Talk.
            </h2>
            <p className="mb-10 max-w-[300px] text-[15px] leading-[1.8] text-[#666] md:mb-12 md:text-base">
              Have a project, partnership or technology requirement? We&apos;d
              love to hear from you.
            </p>

            {/* Contact Details List */}
            <div className="flex flex-col gap-6">
              {CONTACT_DETAILS.map((item) => (
                <div key={item.label}>
                  <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#bbb]">
                    {item.label}
                  </div>
                  <div
                    className={`text-[14px] font-medium ${
                      item.accent ? "text-[#fd018b]" : "text-black"
                    }`}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom/Right Section: Form */}
          <div className="flex w-full flex-col justify-start order-2 lg:pt-2">
            {sent ? (
              <div className="py-8 transition-all lg:py-0">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#fd018b]/30 bg-[#fd018b]/10">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M3 9l4.5 4.5L15 5"
                      stroke="#FD018B"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="mb-2.5 text-[22px] font-bold tracking-[-0.02em] text-black">
                  Message Sent
                </h3>
                <p className="text-[15px] leading-[1.7] text-[#666]">
                  Thank you for reaching out. Our team will be in touch shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="flex w-full flex-col gap-6"
              >
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
                    className="w-full border-0 border-b border-[#eaeaea] bg-transparent px-0 pb-3 pt-1 text-[15px] text-black placeholder-[#999] transition-colors focus:border-black focus:outline-none focus:ring-0"
                  />
                ))}
                <textarea
                  placeholder="Message"
                  rows={3}
                  required
                  value={formState.message}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, message: e.target.value }))
                  }
                  className="w-full resize-none border-0 border-b border-[#eaeaea] bg-transparent px-0 pb-3 pt-1 text-[15px] text-black placeholder-[#999] transition-colors focus:border-black focus:outline-none focus:ring-0"
                />
                <button
                  type="submit"
                  className="mt-2 w-full rounded-[7px] bg-[#fd018b] py-3.5 text-[14px] font-semibold tracking-[0.01em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(253,1,139,0.3)]"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 flex w-full flex-col items-center justify-between gap-3 border-t border-[#eaeaea] pt-5 text-center sm:flex-row sm:text-left lg:mt-24">
          <span className="text-[12px] text-[#bbb]">
            © {new Date().getFullYear()} Manifold Computers Limited
          </span>
          <span className="text-[12px] uppercase tracking-[0.05em] text-[#ccc]">
            Enterprise Technology. Built for Africa.
          </span>
        </div>
      </div>
    </Slide>
  );
}
