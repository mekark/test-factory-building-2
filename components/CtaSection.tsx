"use client";

import { CTA_INCLUDES } from "./sectionContent";
import Image from "next/image";
import OfficesDirectory from "@/components/OfficesDirectory";
import { ReactNode, useRef } from "react";
import { PHONE_DISPLAY, PHONE_NUMBER, WHATSAPP_HREF } from "../lib/contact";
import { useIsDesktop } from "./ViewportContext";
import { useCanvasZoom } from "./useCanvasZoom";
import { EnquiryValues, INDUSTRY_TYPES, SQFT_OPTIONS, useEnquiryForm } from "./useEnquiryForm";

/* ============================================================
   CONTENT DATA
   ============================================================ */

// "Lead includes" ticks, two per row. Row 2's first item has a fixed width in Figma.
const INCLUDES = [
  [CTA_INCLUDES[0], CTA_INCLUDES[1]],
  [CTA_INCLUDES[2], CTA_INCLUDES[3]],
] as const;

/* ============================================================
   FORM FIELD STYLES (Figma: #f0f0f0 fill, #e2e2e2 1px stroke, 8px radius)
   ============================================================ */

const LABEL_CLASS =
  "block text-[14px] font-bold leading-[normal] tracking-[0.3px] text-[#5a5a5a]";

const FIELD_CLASS =
  "block w-full rounded-[8px] border border-solid border-[#e2e2e2] bg-[#f0f0f0] font-normal text-[#18181b] outline-none transition-colors placeholder:text-[#757575] focus:border-[#c4161c]";

const ERROR_CLASS =
  "pointer-events-none absolute left-0 top-full mt-px text-[11px] leading-[13px] text-[#dc2626]";

/* ============================================================
   CTA SECTION
   ============================================================ */

/* ============================================================
   CONTACT CARDS — "Call Now" + "WhatsApp Us Now"
   Same cards as the MEP landing page: dark #212121 pill, red icon tile,
   arrow on the right. Stacked on phones, side by side from 640px up.
   ============================================================ */

function ContactCard({
  href,
  icon,
  eyebrow,
  title,
  titleClass = "",
  external,
}: {
  href: string;
  icon: ReactNode;
  eyebrow?: string;
  title: string;
  titleClass?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex w-full items-center gap-4 rounded-[20px] border border-black/5 bg-[#212121] px-4 py-2.5 transition-colors hover:bg-[#2b2b2b] sm:h-[84px] sm:w-auto sm:min-w-0 sm:flex-1 sm:rounded-[22px] sm:px-5 sm:py-0 sm:max-lg:min-w-[280px]"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#cc000a] sm:size-12 sm:rounded-2xl">
        {icon}
      </span>
      <span className="flex min-w-0 flex-1 flex-col items-start gap-0.5 sm:gap-0">
        {eyebrow && (
          <span className="whitespace-nowrap text-[10px] font-bold uppercase leading-4 text-[#a9a9a9] sm:text-[13px] sm:leading-[18px]">
            {eyebrow}
          </span>
        )}
        <span className={`w-full whitespace-nowrap text-white ${titleClass}`}>
          {title}
        </span>
      </span>
      <img
        src="/cta/lead-arrow.svg"
        alt=""
        width={27}
        height={26}
        className="block h-[26px] w-6 shrink-0 sm:h-auto sm:w-5"
      />
    </a>
  );
}

function ContactCards({ className = "" }: { className?: string }) {
  return (
    <div className={`flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-5 ${className}`}>
      <ContactCard
        href={`tel:${PHONE_NUMBER}`}
        eyebrow="Call Now"
        title={PHONE_DISPLAY}
        titleClass="text-sm font-extrabold leading-6 sm:text-[17px]"
        icon={
          <img
            src="/cta/lead-phone.svg"
            alt=""
            width={26}
            height={26}
            className="block size-6 sm:size-5"
          />
        }
      />
      <ContactCard
        href={WHATSAPP_HREF}
        external
        title="WhatsApp Us Now"
        titleClass="text-sm font-bold leading-6 sm:text-[19px]"
        icon={
          <img
            src="/cta/lead-wa.webp"
            alt=""
            width={39}
            height={39}
            className="block size-[30px] object-cover"
          />
        }
      />
    </div>
  );
}

export default function CtaSection() {
  const canvasRef = useRef<HTMLDivElement>(null);
  useCanvasZoom(canvasRef);

  const { values, errors, submitError, isSubmitting, handleChange, handleSubmit } =
    useEnquiryForm();

  // Error ring for invalid fields.
  const invalid = (field: keyof EnquiryValues) =>
    errors[field] ? "!border-[#dc2626]" : "";

  // Selects show their placeholder in grey until a value is chosen.
  const selectTone = (field: keyof EnquiryValues) =>
    values[field] ? "text-[#18181b]" : "text-[#757575]";

  const isDesktop = useIsDesktop();
  if (!isDesktop) {
    return (
      <section id="contact" className="overflow-hidden bg-[#080b0f] font-sans">
        <CtaMobile />
      </section>
    );
  }

  return (
    /* ==========================================================
       SECTION WRAPPER — 1920×1034 design canvas
       ========================================================== */
    <section id="contact" className="overflow-hidden bg-[#080b0f] font-sans">

      {/* ---------- Desktop layout (1280px and up): unchanged ---------- */}
      <div>
        {/* ---------- Design canvas (zoomed to the viewport on desktop) ---------- */}
        <div
          ref={canvasRef}
          className="canvas-zoom relative isolate mx-auto w-full overflow-hidden px-5 py-14 sm:px-8 sm:py-16 xl:h-[1100px] xl:w-[1920px] xl:p-0"
        >
          {/* ---------- Background: industrial pipework photo, mirrored ---------- */}
          <div className="absolute inset-0 -z-20 -scale-x-100 xl:inset-auto xl:bottom-[0.33px] xl:left-0 xl:h-[1198px] xl:w-[2019.025px]">
            <Image
              src="/cta/bg.webp"
              alt=""
              fill
              sizes="(min-width: 1280px) 2020px, 100vw"
              className="object-cover"
            />
          </div>

          {/* ---------- Background: dark wash, strongest on the left so the copy stays readable ---------- */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 xl:inset-x-0 xl:bottom-auto xl:top-[-0.33px] xl:h-full xl:bg-[linear-gradient(-62.149deg,rgba(16,21,25,0)_0.646%,rgb(8,11,15)_83.168%)]"
          />

          {/* ---------- Background: soft red glow behind the form ---------- */}
          <div
            aria-hidden
            className="absolute left-[1486px] top-[-62.33px] -z-10 size-[774px] rounded-full bg-[rgba(228,0,21,0.3)] opacity-[0.93] blur-[61.667px]"
          />

          {/* ======================================================
              CONTENT — copy + contact cards on the left, enquiry form on the right
              ====================================================== */}
          <div className="relative flex flex-col gap-12 xl:absolute xl:left-[106.67px] xl:top-[82.19px] xl:flex-row xl:items-center xl:gap-[181px]">
            {/* ====================================================
                LEFT COLUMN
                ==================================================== */}
            <div className="flex w-full flex-col items-start gap-[20px] xl:w-[837.333px] xl:shrink-0">
              {/* Heading + intro paragraph */}
              <div className="flex w-full flex-col items-start gap-[16px] xl:gap-[25.467px]">
                <h2 className="w-full text-[36px] font-extrabold leading-[1.15] text-white sm:text-[52px] xl:text-[80px] xl:leading-[81.6px]">
                  Start Your Factory Construction Project
                </h2>
              </div>

              {/* Lead prompt, tick list and the two contact cards */}
              <div className="flex w-full flex-col items-start gap-[24px]">
                {/* Prompt + ticks (fixed 201.48px block on desktop) */}
                <div className="relative w-full xl:h-[201.48px]">
                  <p className="w-full text-[18px] font-semibold leading-[1.5] text-white/80 sm:text-[20px] xl:text-[24px] xl:leading-[36px]">
                    Discuss your manufacturing facility, industrial plant, or heavy
                    infrastructure requirement with our team.
                  </p>
                  <ul className="mt-5 flex flex-col gap-[14px] xl:absolute xl:left-0 xl:top-[84px] xl:mt-0 xl:w-full xl:pt-[12.147px]">
                    {INCLUDES.map((row) => (
                      <li
                        key={row[0]}
                        className="flex flex-wrap items-start gap-x-[30px] gap-y-[14px]"
                      >
                        {row.map((label, i) => (
                          <div
                            key={label}
                            className={`flex items-center gap-[16px] ${i === 0 ? "xl:min-w-[230px]" : ""}`}
                          >
                            {/* Tick badge: half-transparent red circle with a ✓ */}
                            <span className="flex size-[37.333px] shrink-0 items-center justify-center rounded-full bg-[rgba(196,22,28,0.5)] text-[17.333px] font-semibold leading-[normal] text-[#f9f9f9]">
                              ✓
                            </span>
                            <span className="whitespace-nowrap text-[16px] font-semibold leading-[normal] text-white xl:text-[20px]">
                              {label}
                            </span>
                          </div>
                        ))}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact cards (Call Now + WhatsApp) */}
                <ContactCards className="xl:w-[693.333px] xl:flex-nowrap" />


                {/* Office locations (same width as the contact cards) */}
                <OfficesDirectory className="xl:w-[693.333px]" />
              </div>
            </div>

            {/* ====================================================
                RIGHT COLUMN — white "Request Your Project Blueprint" form card
                ==================================================== */}
            <form
              onSubmit={handleSubmit}
              noValidate
              autoComplete="off"
              className="flex w-full flex-col items-center gap-[21px] rounded-[28.998px] border border-solid border-[#e2e2e2] bg-white px-5 py-8 drop-shadow-[0px_24px_40px_rgba(0,0,0,0.06)] sm:px-[46px] sm:py-[42px] xl:w-[600px] xl:shrink-0"
            >
              {/* Form header */}
              <h3 className="w-full max-w-[320px] text-center text-[21.8px] font-extrabold leading-[normal] tracking-[-0.5px] text-[#080808]">
                Request Your Project Blueprint
              </h3>
              <p className="w-full max-w-[317.333px] text-center text-[13px] font-medium leading-[normal] text-[#9a9a9a]">
                Get a custom layout, cost range &amp; 150-day timeline
              </p>

              {/* Fields */}
              <div className="flex w-full flex-col items-start gap-[12px]">
                {/* Row 1: Full Name + Project Location */}
                <div className="flex w-full flex-col gap-[12px] sm:flex-row sm:items-center sm:gap-[32px]">
                  <div className="relative flex flex-1 flex-col gap-[6px]">
                    <label htmlFor="cta-name" className={LABEL_CLASS}>
                      Full Name<span className="text-[#ed1d23]">*</span>
                    </label>
                    <input
                      id="cta-name"
                      name="name"
                      type="text"
                      maxLength={60}
                      placeholder="Your name"
                      value={values.name}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.name)}
                      className={`${FIELD_CLASS} h-[43px] px-[17px] text-[12px] ${invalid("name")}`}
                    />
                    {errors.name ? <p className={ERROR_CLASS}>{errors.name}</p> : null}
                  </div>
                  <div className="relative flex flex-1 flex-col gap-[6px]">
                    <label htmlFor="cta-location" className={LABEL_CLASS}>
                      Project Location
                    </label>
                    <input
                      id="cta-location"
                      name="projectLocation"
                      type="text"
                      placeholder="Enter project location"
                      value={values.projectLocation}
                      onChange={handleChange}
                      className={`${FIELD_CLASS} h-[46px] pl-[21px] pr-[33px] text-[14px] tracking-[0.3px]`}
                    />
                  </div>
                </div>

                {/* Row 2: Mobile Number + Email Address */}
                <div className="flex w-full flex-col gap-[12px] sm:flex-row sm:items-center sm:gap-[32px]">
                  <div className="relative flex flex-1 flex-col gap-[6px]">
                    <label htmlFor="cta-phone" className={LABEL_CLASS}>
                      Mobile Number<span className="text-[#ed1d23]">*</span>
                    </label>
                    <input
                      id="cta-phone"
                      name="phoneNumber"
                      type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  autoComplete="tel-national"
                      placeholder="98765 43210"
                      value={values.phoneNumber}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.phoneNumber)}
                      className={`${FIELD_CLASS} h-[43px] px-[17px] text-[12px] ${invalid("phoneNumber")}`}
                    />
                    {errors.phoneNumber ? (
                      <p className={ERROR_CLASS}>{errors.phoneNumber}</p>
                    ) : null}
                  </div>
                  <div className="relative flex flex-1 flex-col gap-[6px]">
                    <label htmlFor="cta-email" className={LABEL_CLASS}>
                      Email Address
                    </label>
                    <input
                      id="cta-email"
                      name="email"
                      type="email"
                      placeholder="abcd@gmail.com"
                      value={values.email}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.email)}
                      className={`${FIELD_CLASS} h-[46px] px-[17px] text-[14px] ${invalid("email")}`}
                    />
                    {errors.email ? <p className={ERROR_CLASS}>{errors.email}</p> : null}
                  </div>
                </div>

                {/* Row 3: Industry Type + Project Sq. Ft */}
                <div className="flex w-full flex-col gap-[12px] sm:flex-row sm:items-center sm:gap-[33px]">
                  <div className="relative flex flex-1 flex-col gap-[6px]">
                    <label htmlFor="cta-industry" className={LABEL_CLASS}>
                      Industry Type<span className="text-[#ed1d23]">*</span>
                    </label>
                    <select
                      id="cta-industry"
                      name="industryType"
                      value={values.industryType}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.industryType)}
                      className={`${FIELD_CLASS} h-[46px] cursor-pointer appearance-none pl-[21px] pr-[33px] text-[14px] ${selectTone("industryType")} ${invalid("industryType")}`}
                    >
                      <option value="" disabled>
                        Select your Industry
                      </option>
                      {INDUSTRY_TYPES.map((option) => (
                        <option key={option} value={option} className="text-[#18181b]">
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.industryType ? (
                      <p className={ERROR_CLASS}>{errors.industryType}</p>
                    ) : null}
                  </div>
                  <div className="relative flex flex-1 flex-col gap-[6px]">
                    <label htmlFor="cta-sqft" className={LABEL_CLASS}>
                      Project Sq. Ft<span className="text-[#ed1d23]">*</span>
                    </label>
                    <select
                      id="cta-sqft"
                      name="sqft"
                      value={values.sqft}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.sqft)}
                      className={`${FIELD_CLASS} h-[46px] cursor-pointer appearance-none pl-[21px] pr-[33px] text-[14px] ${selectTone("sqft")} ${invalid("sqft")}`}
                    >
                      <option value="" disabled>
                        Select Sq. Ft Requirement
                      </option>
                      {SQFT_OPTIONS.map((option) => (
                        <option key={option} value={option} className="text-[#18181b]">
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.sqft ? <p className={ERROR_CLASS}>{errors.sqft}</p> : null}
                  </div>
                </div>

                {/* Row 4: Requirement Details (full width) */}
                <div className="flex w-full flex-col gap-[6px]">
                  <label htmlFor="cta-requirements" className={LABEL_CLASS}>
                    Requirement Details
                  </label>
                  <textarea
                    id="cta-requirements"
                    name="requirements"
                    rows={1}
                    placeholder="Enter requirement details"
                    value={values.requirements}
                    onChange={handleChange}
                    className={`${FIELD_CLASS} h-[46px] resize-none py-[13px] pl-[21px] pr-[33px] text-[14px] leading-[19px]`}
                  />
                </div>
              </div>

              {/* Submit + reassurance note */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-[58px] w-full items-center justify-center rounded-[8px] bg-[#c4161c] px-[36px] py-[18px] text-center text-[16px] font-extrabold leading-[normal] text-[#f5f5f5] drop-shadow-[0px_8px_16px_rgba(196,22,28,0.3)] transition-colors hover:bg-[#ad1318] disabled:cursor-not-allowed disabled:opacity-80"
              >
                {isSubmitting ? "Submitting..." : "Get My Free Quote →"}
              </button>

              <p className="w-full text-center text-[10.667px] font-medium leading-[normal] tracking-[0.3px] text-[#5a5a5a]">
                100% Transparent Consultation with single point project support
              </p>

              {/* Submission error (only shown when the API call fails) */}
              {submitError ? (
                <p role="alert" className="text-center text-[12px] text-[#dc2626]">
                  {submitError}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   MOBILE / TABLET LAYOUT (below 1280px)
   Same section, same component file: CtaSection renders either this
   layout or the desktop canvas above, never both.
   ============================================================ */

/* ============================================================
   MOBILE CTA (Figma "CTA", 390 × 1194)
   Shown below 1280px only; the desktop CTA is untouched.
   ============================================================ */

// "Lead includes" ticks. Row 1 has a 20px gap; row 2 has fixed item widths and a 24px gap.
const TICKS = [
  { label: CTA_INCLUDES[0], row: 1, width: undefined },
  { label: CTA_INCLUDES[1], row: 1, width: undefined },
  { label: CTA_INCLUDES[2], row: 2, width: 150 },
  { label: CTA_INCLUDES[3], row: 2, width: 176 },
] as const;

/* ============================================================
   FIELD STYLES (Figma: #f0f0f0 fill, #e2e2e2 stroke, 8px radius)
   ============================================================ */

const MobileFIELD_CLASS =
  "block w-full rounded-[8px] border border-solid border-[#e2e2e2] bg-[#f0f0f0] text-[12px] font-normal leading-[normal] text-[#18181b] outline-none transition-colors placeholder:text-[#757575] focus:border-[#c4161c]";

const MobileERROR_CLASS = "mt-1 text-[11px] leading-[13px] text-[#dc2626]";

function CtaMobile() {
  const { values, errors, submitError, isSubmitting, handleChange, handleSubmit } =
    useEnquiryForm();

  // Error ring for invalid fields.
  const invalid = (field: keyof EnquiryValues) =>
    errors[field] ? "!border-[#dc2626]" : "";

  // Selects show their placeholder in grey until a value is chosen.
  const selectTone = (field: keyof EnquiryValues) =>
    values[field] ? "text-[#18181b]" : "text-[#757575]";

  return (
    /* ==========================================================
       MOBILE FRAME — full-width #090909 with one 390px column
       ========================================================== */
    <div className="bg-[#090909] font-sans xl:hidden">
      <div className="relative mx-auto w-full overflow-hidden px-5 py-8">
        {/* ====================================================
            BACKGROUND — faint mirrored pipework, fade to black, red glow
            ==================================================== */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {/* Pipework photo at 20% opacity, mirrored, shifted left so its left part shows */}
          <div className="absolute left-[-154px] top-[0.33px] h-[708px] w-[1263px] -scale-x-100 opacity-20">
            <Image
              src="/cta/bg.webp"
              alt=""
              fill
              sizes="1263px"
              className="object-cover"
            />
          </div>
          {/* Fade from clear to solid black down the page */}
          <div className="absolute left-0 top-0 h-[1596px] w-full bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,#000000_54.327%)]" />
          {/* Soft red glow in the top-right corner */}
          <div className="absolute left-[180px] top-[-61px] size-[274px] rounded-full bg-[rgba(228,0,21,0.3)] opacity-[0.93] blur-[61.667px]" />
        </div>

        {/* ====================================================
            CONTENT COLUMN (350px at 390 wide)
            ==================================================== */}
        <div className="relative flex w-full flex-col items-start gap-[22px]">
          {/* ---------- Heading + intro (two paragraphs) ---------- */}
          <div className="flex w-full flex-col items-start pl-[6px] pr-[14px] [word-break:break-word]">
            <div className="flex w-full max-w-[326px] flex-col items-start gap-3">
              <h2 className="w-full text-[28px] font-extrabold leading-[30px] text-white">
                Start Your Factory Construction Project
              </h2>
              <div className="w-full text-[14px] font-normal leading-[normal] text-white/65">
                <p className="mt-[19px]">
                  Discuss your manufacturing facility, industrial plant, or heavy
                  infrastructure requirement with our team.
                </p>
              </div>
            </div>
          </div>

          {/* ---------- Tick list: two rows of two ---------- */}
          <ul className="flex w-full flex-col items-start gap-[18.667px] pt-[12.147px]">
            {[1, 2].map((row) => (
              <li
                key={row}
                className={`flex w-full items-start ${row === 1 ? "gap-5" : "gap-6"}`}
              >
                {TICKS.filter((tick) => tick.row === row).map((tick) => (
                  <div
                    key={tick.label}
                    className="flex shrink-0 items-center gap-[10px]"
                    style={{ width: tick.width }}
                  >
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[rgba(196,22,28,0.5)] text-[15px] font-semibold leading-[normal] text-[#f9f9f9]">
                      ✓
                    </span>
                    <span className="whitespace-nowrap text-[14px] font-normal leading-[normal] text-white">
                      {tick.label}
                    </span>
                  </div>
                ))}
              </li>
            ))}
          </ul>

          {/* ---------- Contact cards: Call Now + WhatsApp ---------- */}
          <ContactCards />


          {/* ---------- White enquiry form card ---------- */}
          <form
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            className="flex w-full flex-col items-start gap-4 rounded-[24px] border border-solid border-[#e2e2e2] bg-white p-[19px] drop-shadow-[0px_24px_40px_rgba(0,0,0,0.06)]"
          >
            {/* Header */}
            <div className="flex w-full flex-col items-center justify-center gap-2 text-center">
              <h3 className="w-full max-w-[275px] text-[18px] font-extrabold leading-[normal] text-[#080808]">
                Request Your Project Blueprint
              </h3>
              <p className="w-full max-w-[290px] text-[12px] font-medium leading-[normal] text-[#9a9a9a]">
                Get a custom layout, cost range &amp; 150-day* timeline
              </p>
            </div>

            {/* Fields: placeholders only, as in the design */}
            <div className="flex w-full flex-col gap-4">
              <div>
                <input
                  name="name"
                  type="text"
                  maxLength={60}
                  aria-label="Full name"
                  placeholder="Enter Your name"
                  value={values.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                  className={`${MobileFIELD_CLASS} h-[41px] px-4 ${invalid("name")}`}
                />
                {errors.name ? <p className={MobileERROR_CLASS}>{errors.name}</p> : null}
              </div>

              <div>
                <input
                  name="projectLocation"
                  type="text"
                  aria-label="Project location"
                  placeholder="Enter project location"
                  value={values.projectLocation}
                  onChange={handleChange}
                  className={`${MobileFIELD_CLASS} h-[41px] pl-5 pr-8 tracking-[0.3px]`}
                />
              </div>

              <div>
                <input
                  name="phoneNumber"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  autoComplete="tel-national"
                  aria-label="Mobile number"
                  placeholder="Mobile Number*"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.phoneNumber)}
                  className={`${MobileFIELD_CLASS} h-[41px] px-4 ${invalid("phoneNumber")}`}
                />
                {errors.phoneNumber ? <p className={MobileERROR_CLASS}>{errors.phoneNumber}</p> : null}
              </div>

              <div>
                <input
                  name="email"
                  type="email"
                  aria-label="Email address"
                  placeholder="Enter Email Address"
                  value={values.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                  className={`${MobileFIELD_CLASS} h-[41px] px-4 ${invalid("email")}`}
                />
                {errors.email ? <p className={MobileERROR_CLASS}>{errors.email}</p> : null}
              </div>

              <div>
                <div className="relative">
                  <select
                    name="industryType"
                    aria-label="Industry type"
                    value={values.industryType}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.industryType)}
                    className={`${MobileFIELD_CLASS} h-[44px] cursor-pointer appearance-none pl-5 pr-8 ${selectTone("industryType")} ${invalid("industryType")}`}
                  >
                    <option value="" disabled>
                      Select your Industry
                    </option>
                    {INDUSTRY_TYPES.map((option) => (
                      <option key={option} value={option} className="text-[#18181b]">
                        {option}
                      </option>
                    ))}
                  </select>
                  <img
                    src="/hero/mobile/select-arrow.svg"
                    alt=""
                    width={15}
                    height={15}
                    className="pointer-events-none absolute right-4 top-1/2 block size-[15px] -translate-y-1/2 rotate-90"
                  />
                </div>
                {errors.industryType ? <p className={MobileERROR_CLASS}>{errors.industryType}</p> : null}
              </div>

              <div>
                <div className="relative">
                  <select
                    name="sqft"
                    aria-label="Project sq. ft"
                    value={values.sqft}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.sqft)}
                    className={`${MobileFIELD_CLASS} h-[44px] cursor-pointer appearance-none pl-5 pr-8 ${selectTone("sqft")} ${invalid("sqft")}`}
                  >
                    <option value="" disabled>
                      Select Sq. Ft Requirement
                    </option>
                    {SQFT_OPTIONS.map((option) => (
                      <option key={option} value={option} className="text-[#18181b]">
                        {option}
                      </option>
                    ))}
                  </select>
                  <img
                    src="/hero/mobile/select-arrow.svg"
                    alt=""
                    width={15}
                    height={15}
                    className="pointer-events-none absolute right-4 top-1/2 block size-[15px] -translate-y-1/2 rotate-90"
                  />
                </div>
                {errors.sqft ? <p className={MobileERROR_CLASS}>{errors.sqft}</p> : null}
              </div>

              <div>
                <textarea
                  name="requirements"
                  rows={1}
                  aria-label="Requirement details"
                  placeholder="Enter requirement details"
                  value={values.requirements}
                  onChange={handleChange}
                  className={`${MobileFIELD_CLASS} h-[44px] resize-none py-3 pl-5 pr-8 leading-[19px]`}
                />
              </div>
            </div>

            {/* Submit + reassurance note */}
            <div className="flex w-full flex-col items-start gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center rounded-[8px] bg-[#c4161c] px-9 py-[14px] text-center text-[14px] font-semibold leading-[normal] text-[#f5f5f5] drop-shadow-[0px_8px_16px_rgba(196,22,28,0.3)] transition-colors hover:bg-[#ad1318] disabled:cursor-not-allowed disabled:opacity-80"
              >
                {isSubmitting ? "Submitting..." : "Get My Free Quote →"}
              </button>
              <p className="w-full text-center text-[12px] font-medium leading-[normal] text-[#5a5a5a]">
                100% Transparent Consultation with single point project support
              </p>
              {submitError ? (
                <p role="alert" className="w-full text-center text-[12px] text-[#dc2626]">
                  {submitError}
                </p>
              ) : null}
            </div>
          </form>

          {/* ---------- Office locations ---------- */}
          <OfficesDirectory />
        </div>
      </div>
    </div>
  );
}
