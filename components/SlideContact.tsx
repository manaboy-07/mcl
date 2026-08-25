"use client";

import type { CSSProperties, Dispatch, SetStateAction } from "react";

import styles from "../app/SlideContact.module.css";
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
      <div className={styles.grid}>
        {/* Left */}
        <div>
          <p className={styles.eyebrow}>Contact</p>
          <h2 className={styles.title}>Let&apos;s Talk.</h2>
          <p className={styles.body}>
            Have a project, partnership or technology requirement? We&apos;d
            love to hear from you.
          </p>

          <div className={styles.detailsList}>
            {CONTACT_DETAILS.map((item) => (
              <div key={item.label}>
                <div className={styles.detailLabel}>{item.label}</div>
                <div
                  className={
                    item.accent ? styles.detailValueAccent : styles.detailValue
                  }
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <div>
          {sent ? (
            <div className={styles.confirmation}>
              <div className={styles.confirmationIcon}>
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
              <h3 className={styles.confirmationTitle}>Message Sent</h3>
              <p className={styles.confirmationBody}>
                Thank you for reaching out. Our team will be in touch shortly.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className={styles.form}
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
                  className={styles.input}
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
                className={styles.textarea}
              />
              <button type="submit" className={styles.submitButton}>
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>

      <div className={styles.footer}>
        <span className={styles.footerCopy}>
          © 2026 Manifold Computers Limited
        </span>
        <span className={styles.footerTag}>
          Enterprise Technology. Built for Africa.
        </span>
      </div>
    </Slide>
  );
}
