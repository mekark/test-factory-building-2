"use client";

import { HERO_FEATURES, HERO_STATS } from "./sectionContent";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useRef } from "react";
import { PHONE_NUMBER, WHATSAPP_HREF } from "../lib/contact";
import { useIsDesktop } from "./ViewportContext";
import { useCanvasZoom } from "./useCanvasZoom";
import { EnquiryValues, INDUSTRY_TYPES, SQFT_OPTIONS, useEnquiryForm } from "./useEnquiryForm";

// Inter is only used by the hero badge (per Figma).
const inter = Inter({ subsets: ["latin"], weight: ["400", "500"] });

/* ============================================================
   CONTENT DATA
   ============================================================ */

// Industries served, in Figma grid order (row by row, two columns).
const FEATURES = HERO_FEATURES;

// Client logos: size is the logo box in px, dx/dy are Figma's sub-pixel nudges.
const CLIENT_LOGOS = [
  { name: "VWU", src: "/hero/logos/vwu.webp", w: 42, h: 42, dx: 0, dy: -0.5 },
  {
    name: "Voltas",
    src: "/hero/logos/voltas.webp",
    w: 75,
    h: 75,
    dx: -0.5,
    dy: 0,
  },
  { name: "CAT", src: "/hero/logos/cat.webp", w: 56, h: 56, dx: 0, dy: 0 },
  { name: "TVS", src: "/hero/logos/tvs.webp", w: 75, h: 75, dx: 0.5, dy: 0 },
  {
    name: "Tata Electronics",
    src: "/hero/logos/tata.webp",
    w: 75,
    h: 75,
    dx: 0.5,
    dy: 0,
  },
  {
    name: "Schwing Stetter",
    src: "/hero/logos/stetter.webp",
    w: 75,
    h: 75,
    dx: 0.5,
    dy: 0,
  },
  { name: "SRF", src: "/hero/logos/srf.webp", w: 75, h: 75, dx: 0.5, dy: 0 },
  {
    name: "Saveetha",
    src: "/hero/logos/saveetha.webp",
    w: 48,
    h: 48,
    dx: 0,
    dy: 0,
  },
  {
    name: "Sarvam Safety",
    src: "/hero/logos/sarvam.webp",
    w: 31,
    h: 31,
    dx: 0.5,
    dy: -0.5,
  },
  {
    name: "Reliance",
    src: "/hero/logos/reliance.webp",
    w: 44,
    h: 44,
    dx: 0,
    dy: 0,
  },
  {
    name: "Orbittal",
    src: "/hero/logos/orbittal.webp",
    w: 49,
    h: 49,
    dx: 0.5,
    dy: -0.5,
  },
  {
    name: "NS Instruments",
    src: "/hero/logos/nsi.webp",
    w: 46,
    h: 46,
    dx: 0,
    dy: 0,
  },
  { name: "MRF", src: "/hero/logos/mrf.webp", w: 30, h: 30, dx: 0, dy: 0 },
  { name: "L&T", src: "/hero/logos/lt.webp", w: 32, h: 32, dx: 0, dy: 0 },
  {
    name: "LA Freightlift",
    src: "/hero/logos/laf.webp",
    w: 56,
    h: 56,
    dx: 0,
    dy: 0,
  },
  {
    name: "Komatsu",
    src: "/hero/logos/komatsu.webp",
    w: 30,
    h: 30,
    dx: 0,
    dy: 0,
  },
] as const;

// Stats: value (white) + suffix (red, each with its own Figma colour).
const STAT_SUFFIX_COLORS = ["#c4161c", "#cc000a", "#ed1d23", "#c4161c"] as const;
const STATS = HERO_STATS.map((stat, i) => ({
  ...stat,
  suffixColor: STAT_SUFFIX_COLORS[i],
}));

/* ============================================================
   FORM FIELD STYLES (Figma: #f0f0f0 fill, #e2e2e2 1.101px stroke)
   ============================================================ */

const LABEL_CLASS = "block text-[14px] font-bold leading-[19px] text-white";

const FIELD_BASE_CLASS =
  "block w-full rounded-[8px] border-[1.101px] border-[#e2e2e2] bg-[#f0f0f0] text-[12px] font-normal text-[#18181b] outline-none transition-colors placeholder:text-[#757575] focus:border-[#c4161c]";

const ERROR_CLASS =
  "pointer-events-none absolute left-0 top-full mt-px text-[11px] leading-[13px] text-[#ff6b6b]";

/* ============================================================
   HERO SECTION
   ============================================================ */

export default function HeroSection() {
  const {
    values,
    errors,
    submitError,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useEnquiryForm();
  const canvasRef = useRef<HTMLDivElement>(null);

  useCanvasZoom(canvasRef);

  // Error ring for invalid fields.
  const invalid = (field: keyof EnquiryValues) =>
    errors[field] ? "!border-[#ff6b6b]" : "";

  // Selects show their placeholder option in Figma grey until a value is chosen.
  const selectTone = (field: keyof EnquiryValues) =>
    values[field] ? "text-[#18181b]" : "text-[#757575]";

  const isDesktop = useIsDesktop();
  if (!isDesktop) {
    return (
      <section className="hero-section relative isolate overflow-hidden bg-[#060606] font-sans">
        <HeroMobile />
      </section>
    );
  }

  return (
    /* ==========================================================
       HERO WRAPPER — full-bleed background, 1920×1013 design canvas
       ========================================================== */
    <section className="hero-section relative isolate overflow-hidden bg-[#060606] font-sans">

      {/* ---------- Desktop layout (1280px and up): unchanged ---------- */}
      <div>
        {/* ---------- Background: industrial plant photo ---------- */}
        <Image
          src="/hero/hero-bg.webp"
          alt=""
          width={1672}
          height={941}
          priority
          aria-hidden
          className="absolute inset-0 -z-20 h-full w-full max-w-none object-cover object-[70%_center] xl:inset-auto xl:left-[1.4635%] xl:top-0 xl:h-auto xl:w-[102.43%] xl:object-fill"
        />

        {/* ---------- Background: dark-to-red left→right gradient overlay ---------- */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#060606_24.831%,rgba(6,6,6,0.8)_42.674%,rgba(141,21,23,0.07)_69.272%,rgba(237,32,36,0.13)_88.021%)] max-xl:bg-[linear-gradient(180deg,rgba(6,6,6,0.82)_0%,rgba(6,6,6,0.9)_100%)]"
        />

        {/* ---------- Design canvas ----------
            ≥1920px: exact Figma frame (1920 wide, 135.5px left inset), zoom 1.
            1280–1919px: same frame, zoomed continuously to fill the viewport.
            <1280px: stacked mobile layout. */}
        <div
          ref={canvasRef}
          className="canvas-zoom relative mx-auto w-full px-4 pb-16 pt-12 sm:px-6 xl:h-[1013px] xl:w-[1920px] xl:pb-0 xl:pl-[80px] xl:pr-0 xl:pt-[86px]"
        >
          <div className="flex flex-col gap-12 xl:flex-row xl:items-center xl:gap-[49px]">
            {/* ========================================================
                LEFT COLUMN — copy, features, logos, stats, CTAs
                ======================================================== */}
            <div className="flex w-full min-w-0 flex-col items-start gap-[24px] xl:w-[1048px] xl:shrink-0">
              {/* ---------- Eyebrow badge ---------- */}
              <p
                className={`${inter.className} flex items-center gap-[10.667px] rounded-full border-[1.333px] border-white/20 px-[17.333px] py-[9.333px] text-[14px] font-medium leading-[21.333px] text-white sm:text-[16px]`}
              >
                <span
                  aria-hidden
                  className="size-[10.667px] shrink-0 rounded-full bg-[#e40015]"
                />
                Turnkey Factory Construction &amp; Industrial EPC Company
              </p>

              {/* ---------- Main heading (white line + red highlight bar) ---------- */}
              <h1 className="flex flex-col items-start gap-[12px] font-bold text-white xl:gap-[20px]">
                <span className="text-[30px] leading-[38px] sm:text-[42px] sm:leading-[50px] xl:whitespace-nowrap xl:text-[54px] xl:leading-[58px]">
                  Build Factory. Design to Delivery
                </span>
                <span className="relative inline-block bg-[#ed1d23] px-[5px] text-[30px] leading-[42px] sm:text-[42px] sm:leading-[52px] xl:block xl:h-[59px] xl:w-[771px] xl:p-0">
                  <span className="block whitespace-nowrap xl:absolute xl:left-[5px] xl:top-[24px] xl:-translate-y-1/2 xl:text-[54px] xl:leading-[58px]">
                    Construction &amp; Turnkey EPC
                  </span>
                </span>
              </h1>

              {/* ---------- Sub-heading ---------- */}
              <div className="w-full text-[17px] font-normal leading-[24px] text-[#a9a9a9] sm:text-[20px] sm:leading-[26px] xl:w-[862px] xl:text-[22px] xl:leading-[28px]">
                <p>
                  <span className="font-bold text-[#ed1d23]">MEKARK</span> -
                  Builds Every Structure You Want.
                </p>
                <p>
                  All kinds of Industrial, Factory Construction &amp; Expansion
                  projects –{" "}
                  <span className="font-bold text-white">ALL INDIA</span>
                </p>
              </div>

              <div className="flex w-full flex-col items-start gap-[16px]">
                <p className="w-full text-[17px] font-bold leading-[24px] text-[#f3f3f3] sm:text-[20px] sm:leading-[26px] xl:text-[22px] xl:leading-[28px]">
                  In-House PEB Manufacturing - Civil - PEB – MEP - Turnkey EPC.
                </p>

                {/* ---------- Feature list (2 × 3 grid with red chevrons) ---------- */}
                <ul className="grid w-full grid-cols-1 gap-y-[14px] md:grid-cols-2 md:gap-x-[20px] md:gap-y-[16px] xl:inline-grid xl:w-auto xl:grid-cols-[repeat(2,fit-content(100%))]">
                  {FEATURES.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-[8px] self-start justify-self-start"
                    >
                      <img
                        src="/hero/icons/chevron.svg"
                        alt=""
                        width={24}
                        height={24}
                        className="block size-[24px] shrink-0"
                      />
                      <span className="text-[15px] font-normal leading-[20px] text-[#f7f7f7] xl:whitespace-nowrap xl:text-[18px]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ---------- "Trusted Across India" client logo marquee ---------- */}
              <div className="relative h-[147px] w-full overflow-hidden rounded-[18px] xl:w-[847px] xl:shrink-0">
                {/* Strip background: black → bronze vertical gradient with heavy backdrop blur */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(180deg,#060606_0.179%,rgba(105,63,29,0.5)_99.821%)] backdrop-blur-[500px]"
                />

                {/* Strip label */}
                <p className="absolute left-[41px] top-[20.67px] whitespace-nowrap text-[14px] font-semibold uppercase leading-[20px] text-[#fa7783]">
                  Trusted Across India
                </p>

                {/* Scrolling logo track (two identical sets for a seamless loop) */}
                <div className="absolute left-[32px] right-[26px] top-[55.33px] h-[75px] overflow-hidden xl:right-auto xl:w-[789px]">
                  <div className="hero-logo-track absolute left-0 top-[17px] flex w-max items-center gap-[50px] pr-[50px]">
                    {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, index) => (
                      <div
                        key={`${logo.name}-${index}`}
                        className="relative h-[40px] w-[90px] shrink-0 rounded-[8px] bg-[#f9f6f7]"
                        aria-hidden={index >= CLIENT_LOGOS.length}
                      >
                        <img
                          src={logo.src}
                          alt={index < CLIENT_LOGOS.length ? logo.name : ""}
                          width={logo.w}
                          height={logo.h}
                          loading="lazy"
                          className="pointer-events-none absolute left-1/2 top-1/2 max-w-none object-contain"
                          style={{
                            width: logo.w,
                            height: logo.h,
                            transform: `translate(calc(-50% + ${logo.dx}px), calc(-50% + ${logo.dy}px))`,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ---------- "Built at Scale" stats row ---------- */}
              <div className="grid w-full grid-cols-2 gap-x-6 gap-y-6 border-t-[0.667px] border-[#e2e2e2] pt-6 sm:flex sm:w-auto sm:flex-wrap sm:items-center sm:gap-x-[48px] sm:pt-[0.667px] xl:h-[117.333px] xl:flex-nowrap">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-start gap-[5.333px] whitespace-nowrap sm:h-[85.333px] sm:justify-center xl:justify-start"
                  >
                    <p className="text-[32px] font-extrabold leading-[normal] text-white xl:text-[42px]">
                      {stat.value}
                      <span style={{ color: stat.suffixColor }}>
                        {stat.suffix}
                      </span>
                    </p>
                    <p className="text-[13px] font-semibold uppercase leading-[normal] text-[#9a9a9a] xl:text-[16px]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* ---------- CTA buttons: WhatsApp + Call Now ---------- */}
              <div className="flex flex-wrap items-center gap-[16px] sm:gap-[30px]">
                {/* WhatsApp (solid white pill) */}
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-[55.333px] items-center justify-center gap-[9.623px] rounded-full bg-white px-[24.058px] text-[16px] font-bold leading-[24.058px] text-[#e5091f] transition-opacity hover:opacity-90"
                >
                  WhatsApp
                  <span className="relative block size-[18px] shrink-0 overflow-hidden">
                    <span
                      className="absolute inset-y-0 left-0 right-[0.48%] [mask-repeat:no-repeat] [mask-size:18px_18px]"
                      style={{
                        maskImage: "url(/hero/icons/whatsapp-mask.svg)",
                      }}
                    >
                      <img
                        src="/hero/icons/whatsapp.svg"
                        alt=""
                        width={18}
                        height={18}
                        className="absolute inset-0 block size-full max-w-none"
                      />
                    </span>
                  </span>
                </a>

                {/* Call Now (outlined pill) */}
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="flex h-[55.333px] items-center justify-center gap-[9.623px] rounded-full border border-white px-[24.058px] text-[16px] font-bold leading-[24.058px] text-white transition-colors hover:bg-white/10"
                >
                  Call Now
                  <img
                    src="/hero/icons/phone-call.svg"
                    alt=""
                    width={18}
                    height={18}
                    className="block size-[18px] shrink-0"
                  />
                </a>
              </div>
            </div>

            {/* ========================================================
                RIGHT COLUMN — "Request Your Project Blueprint" glass form
                ======================================================== */}
            <form
              onSubmit={handleSubmit}
              noValidate
              autoComplete="off"
              className="flex w-full flex-col items-center gap-[26px] rounded-[31.931px] bg-[rgba(255,255,255,0.01)] px-5 py-8 shadow-[0px_26.428px_88.092px_0px_rgba(0,0,0,0.45)] backdrop-blur-[15px] sm:px-[50px] sm:py-[44px] xl:w-[660.688px] xl:shrink-0"
            >
              {/* ---------- Form header ---------- */}
              <div className="flex w-full max-w-[364px] flex-col items-start gap-[6px] text-center">
                <h2 className="w-full text-[20px] font-extrabold leading-[normal] text-[#f5f5f5] sm:text-[24px]">
                  Request Your Project Blueprint
                </h2>
                <div className="flex w-full max-w-[349.431px] flex-col items-center justify-center">
                  <p className="w-full max-w-[337px] text-[14px] font-medium leading-[normal] text-white">
                    Get a custom layout, cost range &amp; 150-day* timeline
                  </p>
                </div>
              </div>

              {/* ---------- Form fields ---------- */}
              <div className="flex w-full flex-col items-start">
                {/* Row 1: Full Name + Project Location */}
                <div className="flex w-full flex-col xl:flex-row xl:items-center xl:gap-[35px]">
                  {/* Full Name (Figma: no top padding, 7px label gap) */}
                  <div className="relative flex w-full flex-col gap-[7px] pt-[14px] xl:w-[262.202px] xl:shrink-0 xl:pt-0">
                    <label htmlFor="hero-name" className={LABEL_CLASS}>
                      Full Name<span className="text-[#ed1d23]">*</span>
                    </label>
                    <input
                      id="hero-name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={values.name}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.name)}
                      className={`${FIELD_BASE_CLASS} h-[46.2px] pl-[18px] pr-[18px] ${invalid("name")}`}
                    />
                    {errors.name ? (
                      <p className={ERROR_CLASS}>{errors.name}</p>
                    ) : null}
                  </div>

                  {/* Project Location */}
                  <div className="relative flex w-full flex-col gap-[6.607px] pt-[14px] xl:w-[261.339px] xl:shrink-0">
                    <label htmlFor="hero-location" className={LABEL_CLASS}>
                      Project Location
                    </label>
                    <input
                      id="hero-location"
                      name="projectLocation"
                      type="text"
                      placeholder="Enter Project Location"
                      value={values.projectLocation}
                      onChange={handleChange}
                      className={`${FIELD_BASE_CLASS} h-[46.2px] pl-[22.13px] pr-[35px] tracking-[0.3303px]`}
                    />
                  </div>
                </div>

                {/* Row 2: Mobile Number + Email Address */}
                <div className="flex w-full flex-col xl:flex-row xl:items-center xl:gap-[35.237px]">
                  {/* Mobile Number */}
                  <div className="relative flex w-full flex-col gap-[6.607px] pt-[14px] xl:w-[261.339px] xl:shrink-0">
                    <label htmlFor="hero-phone" className={LABEL_CLASS}>
                      Mobile Number<span className="text-[#ed1d23]">*</span>
                    </label>
                    <input
                      id="hero-phone"
                      name="phoneNumber"
                      type="tel"
                      inputMode="tel"
                      maxLength={16}
                      placeholder="+91 98765 43210"
                      value={values.phoneNumber}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.phoneNumber)}
                      className={`${FIELD_BASE_CLASS} h-[46.2px] pl-[17.62px] pr-[17.62px] ${invalid("phoneNumber")}`}
                    />
                    {errors.phoneNumber ? (
                      <p className={ERROR_CLASS}>{errors.phoneNumber}</p>
                    ) : null}
                  </div>

                  {/* Email Address */}
                  <div className="relative flex w-full flex-col gap-[6.607px] pt-[14px] xl:w-[261.339px] xl:shrink-0">
                    <label htmlFor="hero-email" className={LABEL_CLASS}>
                      Email Address
                    </label>
                    <input
                      id="hero-email"
                      name="email"
                      type="email"
                      placeholder="abcd@gmail.com"
                      value={values.email}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.email)}
                      className={`${FIELD_BASE_CLASS} h-[46.2px] pl-[17.62px] pr-[17.62px] ${invalid("email")}`}
                    />
                    {errors.email ? (
                      <p className={ERROR_CLASS}>{errors.email}</p>
                    ) : null}
                  </div>
                </div>

                {/* Row 3: Industry Type + Project Sq. Ft (selects) */}
                <div className="flex w-full flex-col xl:flex-row xl:items-center xl:gap-[37px]">
                  {/* Industry Type */}
                  <div className="relative flex w-full flex-col gap-[6.607px] pt-[14px] xl:w-[261.339px] xl:shrink-0">
                    <label htmlFor="hero-industry" className={LABEL_CLASS}>
                      Industry Type<span className="text-[#ed1d23]">*</span>
                    </label>
                    <select
                      id="hero-industry"
                      name="industryType"
                      value={values.industryType}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.industryType)}
                      className={`${FIELD_BASE_CLASS} h-[46.2px] cursor-pointer appearance-none pl-[16.62px] pr-[35px] ${selectTone("industryType")} ${invalid("industryType")}`}
                    >
                      <option value="" disabled>
                        Select your Industry type
                      </option>
                      {INDUSTRY_TYPES.map((option) => (
                        <option
                          key={option}
                          value={option}
                          className="text-[#18181b]"
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.industryType ? (
                      <p className={ERROR_CLASS}>{errors.industryType}</p>
                    ) : null}
                  </div>

                  {/* Project Sq. Ft */}
                  <div className="relative flex w-full flex-col gap-[6.607px] pt-[14px] xl:w-[261.339px] xl:shrink-0">
                    <label htmlFor="hero-sqft" className={LABEL_CLASS}>
                      Project Sq. Ft<span className="text-[#ed1d23]">*</span>
                    </label>
                    <select
                      id="hero-sqft"
                      name="sqft"
                      value={values.sqft}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.sqft)}
                      className={`${FIELD_BASE_CLASS} h-[46.2px] cursor-pointer appearance-none pl-[22px] pr-[35px] xl:w-[261.079px] ${selectTone("sqft")} ${invalid("sqft")}`}
                    >
                      <option value="" disabled>
                        Select Sq.ft Requirement
                      </option>
                      {SQFT_OPTIONS.map((option) => (
                        <option
                          key={option}
                          value={option}
                          className="text-[#18181b]"
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.sqft ? (
                      <p className={ERROR_CLASS}>{errors.sqft}</p>
                    ) : null}
                  </div>
                </div>

                {/* Row 4: Requirement Details (textarea) */}
                <div className="relative flex w-full flex-col gap-[6.607px] pt-[14px] xl:w-[559px]">
                  <label htmlFor="hero-requirements" className={LABEL_CLASS}>
                    Requirement Details
                  </label>
                  <textarea
                    id="hero-requirements"
                    name="requirements"
                    placeholder="Enter Requirement Details"
                    value={values.requirements}
                    onChange={handleChange}
                    className={`${FIELD_BASE_CLASS} h-[82.2px] resize-none pb-[14px] pl-[22px] pr-[35px] pt-[14px] leading-[normal]`}
                  />
                </div>
              </div>

              {/* ---------- Submit button + reassurance note ---------- */}
              <div className="flex w-full flex-col items-center gap-[14px]">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex h-[63.867px] w-full items-center justify-center rounded-[9px] bg-[#c4161c] px-[40px] py-[20px] text-center text-[18px] font-bold leading-[normal] text-[#f5f5f5] drop-shadow-[0px_8.809px_17.618px_rgba(196,22,28,0.3)] transition-colors hover:bg-[#ad1318] disabled:cursor-not-allowed disabled:opacity-80"
                >
                  {isSubmitting ? "Submitting..." : "Get a Free Quote →"}
                </button>

                <p className="py-px text-center text-[12px] font-medium leading-[normal] tracking-[0.3303px] text-[#c1c1c1]">
                  100% Transparent Consultation with single point project
                  support
                </p>

                {/* Submission error (only shown when the API call fails) */}
                {submitError ? (
                  <p
                    role="alert"
                    className="text-center text-[12px] text-[#ff6b6b]"
                  >
                    {submitError}
                  </p>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   MOBILE / TABLET LAYOUT (below 1280px)
   Same section, same component file: HeroSection renders either this
   layout or the desktop canvas above, never both.
   ============================================================ */

// Inter is only used by the hero badge (per Figma).
const MobileInter = Inter({ subsets: ["latin"], weight: ["500"] });

/* ============================================================
   MOBILE HERO (Figma "Section", 390 × 1690)
   Shown below 1280px only; the desktop hero is untouched.
   ============================================================ */

/* ============================================================
   CONTENT DATA
   ============================================================ */

const MobileFEATURES = HERO_FEATURES;

// The four client logos shown on mobile. size = logo box inside the 64×40 tile, as in Figma;
// `crop` is Figma's custom placement of the photo inside that box.
const LOGOS = [
  { name: "L&T", src: "/hero/logos/mobile-logo-1.webp", w: 64, h: 35 },
  { name: "CAT", src: "/hero/logos/cat.webp", w: 36, h: 36 },
  { name: "TVS", src: "/hero/logos/tvs.webp", w: 52, h: 53 },
  {
    name: "Tata Electronics",
    src: "/hero/logos/mobile-logo-4.webp",
    w: 32,
    h: 32,
    crop: { left: "-100%", top: "-69.9%", width: "300%", height: "301.97%" },
  },
] as const;

// Suffix colours differ slightly per stat in the design.
const MobileSTAT_SUFFIX_COLORS = ["#c4161c", "#cc000a", "#c4161c", "#c4161c"] as const;
const MobileSTATS = HERO_STATS.map((stat, i) => ({
  ...stat,
  suffixColor: MobileSTAT_SUFFIX_COLORS[i],
}));

/* ============================================================
   FIELD STYLES (Figma: #f0f0f0 fill, #e2e2e2 stroke, 8px radius, 44px tall)
   ============================================================ */

const FIELD_CLASS =
  "block h-[44px] w-full rounded-[8px] border border-solid border-[#e2e2e2] bg-[#f0f0f0] text-[12px] font-normal leading-[normal] text-[#18181b] outline-none transition-colors placeholder:text-[#757575] focus:border-[#c4161c]";

const MobileERROR_CLASS = "mt-1 text-[11px] leading-[13px] text-[#ff8a8a]";

function HeroMobile() {
  const { values, errors, submitError, isSubmitting, handleChange, handleSubmit } =
    useEnquiryForm();

  // Error ring for invalid fields.
  const invalid = (field: keyof EnquiryValues) =>
    errors[field] ? "!border-[#ff6b6b]" : "";

  // Selects show their placeholder in grey until a value is chosen.
  const selectTone = (field: keyof EnquiryValues) =>
    values[field] ? "text-[#18181b]" : "text-[#757575]";

  return (
    /* ==========================================================
       MOBILE FRAME — one 390px column, page background shows beside it on tablets
       ========================================================== */
    <div className="relative mx-auto w-full overflow-hidden bg-[#060606] pb-[36px] pt-[16px] font-sans xl:hidden">
      {/* ======================================================
          BACKGROUND STACK (bottom → top), positioned as in Figma.
          Left offsets/widths are % of the frame so it scales with the column;
          vertical offsets are px from the top.
          ====================================================== */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* 1. Warehouse at sunset (only a sliver shows at the very top) */}
        <Image
          src="/hero/mobile/layer1.webp"
          alt=""
          fetchPriority="low"
          width={941}
          height={1672}
          className="absolute left-[-0.77%] top-[-118px] h-auto w-[100.77%] max-w-none"
        />
        {/* 2. Steel frame at dusk, tall photo */}
        <Image
          src="/hero/mobile/image22.webp"
          alt=""
          fetchPriority="low"
          width={941}
          height={1672}
          className="absolute left-[-70.51%] top-[15px] h-auto w-[241.28%] max-w-none"
        />
        {/* 3. Steel frame, second crop behind the form */}
        <Image
          src="/hero/mobile/image23.webp"
          alt=""
          fetchPriority="low"
          width={714}
          height={2202}
          className="absolute left-[-15.13%] top-[419px] h-auto w-[129.49%] max-w-none"
        />
        {/* 4. 40% black wash from below the hero image */}
        <div className="absolute inset-x-0 top-[284px] h-[1691px] bg-[rgba(15,15,15,0.4)]" />
        {/* 5. Dark vignette image + radial shade */}
        <Image
          src="/hero/mobile/overlay-a.webp"
          alt=""
          fetchPriority="low"
          width={941}
          height={1672}
          className="absolute left-[-91.28%] top-[-8.5px] h-auto w-[282.97%] max-w-none"
        />
        <img
          src="/hero/mobile/overlay-b.svg"
          alt=""
          width={1017}
          height={1733}
          className="absolute left-[-80.77%] top-0 block h-[1733px] w-[260.77%] max-w-none"
        />
      </div>

      {/* ======================================================
          CONTENT COLUMN — 20px side padding (350px at 390 wide)
          ====================================================== */}
      <div className="relative z-10 flex flex-col gap-[13px] px-5">
        {/* ---------- Badge, hero photo with headline, intro paragraph ---------- */}
        <div className="flex flex-col gap-[12px]">
          <div className="-mx-5 flex flex-col gap-[19px]">
            {/* Badge */}
            <p className={`${MobileInter.className} ml-5 flex h-[28px] w-fit items-center gap-2 rounded-full border border-solid border-white/20 px-3 text-[10px] font-medium leading-[normal] text-white`}>
              <span aria-hidden className="size-2 shrink-0 rounded-full bg-[#e40015]" />
              Turnkey Factory Construction &amp; Industrial EPC Company
            </p>

            {/* Hero photo (full width) with the two-line headline over its lower half */}
            <div className="relative h-[219px] overflow-hidden bg-[#060606]">
              <Image
                src="/hero/hero-bg.webp"
                alt=""
                width={1672}
                height={941}
                sizes="390px"
                loading="eager"
                fetchPriority="high"
                className="absolute bottom-[-1px] left-0 h-auto w-full max-w-none"
              />
              <div className="absolute bottom-px left-0 h-[108px] w-full bg-[linear-gradient(182.77deg,rgba(30,30,30,0)_1.0095%,#1e1e1e_99.312%)]" />
              <h1>
                <span className="absolute left-5 top-[166px] block w-[350px] -translate-y-1/2 text-[22px] font-bold leading-[normal] text-white">
                  Build Factory. Design to Delivery
                </span>
                <span className="absolute left-[-1px] top-[185px] block bg-[#c4161c] py-px pl-5 pr-2 text-[16px] font-bold leading-[normal] text-white">
                  Construction &amp; Turnkey EPC
                </span>
              </h1>
            </div>
          </div>

          <div className="w-full text-[14px] font-normal leading-[normal] text-[#a9a9a9]">
            <p>
              <span className="font-bold text-[#ed1d23]">MEKARK</span> - Builds
              Every Structure You Want.
            </p>
            <p>
              All kinds of Industrial, Factory Construction &amp; Expansion
              projects – <span className="font-bold text-white">ALL INDIA</span>
            </p>
          </div>

        </div>

        {/* ---------- Feature list (red chevrons) ---------- */}
        <div className="flex flex-col gap-[6px]">
        <p className="w-full text-[14px] font-bold leading-[normal] text-[#f3f3f3]">
          In-House PEB Manufacturing - Civil - PEB – MEP - Turnkey EPC.
        </p>
        <ul className="flex flex-col gap-[6px]">
          {MobileFEATURES.map((feature) => (
            <li key={feature} className="flex items-center gap-2 rounded-[12px] px-3">
              <img
                src="/hero/mobile/chevron.svg"
                alt=""
                width={15}
                height={15}
                className="block size-[15px] shrink-0"
              />
              <span
                className={`min-w-0 flex-1 text-[12px] font-normal text-[#b5b5b5] leading-[normal]`}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>
        </div>

        {/* ---------- "Trusted Across India" logo card ---------- */}
        <div className="flex flex-col gap-4 rounded-[10px] bg-[linear-gradient(175.66deg,rgb(8,9,10)_1.2889%,rgb(101,69,40)_91.175%)] px-4 py-6">
          <p className="whitespace-nowrap text-[14px] font-semibold uppercase leading-[20px] text-[#ed1d23]">
            Trusted Across India
          </p>
          {/* One row always: tiles share the full card width equally, shrinking on narrow phones such as the
              iPhone SE; the gap tightens below 380px so all four logos still fit. */}
          <div className="flex w-full flex-nowrap items-start gap-x-3 max-[379px]:gap-x-2">
            {LOGOS.map((logo) => (
              <div
                key={logo.name}
                className="flex h-[44px] min-w-0 flex-1 basis-0 items-center justify-center overflow-hidden rounded-[6px] bg-[#f9f6f7]"
              >
                {"crop" in logo ? (
                  <div
                    className="relative shrink-0 overflow-hidden"
                    style={{ width: logo.w, height: logo.h }}
                  >
                    <img
                      src={logo.src}
                      alt={logo.name}
                      width={logo.w}
                      height={logo.h}
                      loading="lazy"
                      decoding="async"
                      className="absolute max-w-none"
                      style={logo.crop}
                    />
                  </div>
                ) : (
                  <img
                    src={logo.src}
                    alt={logo.name}
                    width={logo.w}
                    height={logo.h}
                    className="block shrink object-contain"
                    style={{ width: logo.w, height: logo.h, maxWidth: "100%" }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ---------- "Built at scale" stats: 2 × 2 cards ---------- */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-[14px]">
          {MobileSTATS.map((stat) => (
            <div
              key={stat.label}
              className="flex h-[75px] flex-col justify-center gap-1 whitespace-nowrap rounded-[10px] border border-solid border-white/[0.08] bg-[#1a1a1a] px-5"
            >
              <p className="text-[24px] font-extrabold leading-[normal] text-white">
                {stat.value}
                <span style={{ color: stat.suffixColor }}>{stat.suffix}</span>
              </p>
              <p className="text-[10px] font-semibold uppercase leading-[normal] text-[#9a9a9a]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* ---------- Enquiry form card + WhatsApp / Call buttons ---------- */}
        <div className="flex flex-col gap-4 px-4 py-6">
          <form
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            className="flex flex-col items-center gap-4 rounded-[24px] bg-[rgba(255,255,255,0.01)] px-5 py-6 shadow-[0px_26.43px_88.09px_0px_rgba(0,0,0,0.06)] backdrop-blur-[15px]"
          >
            {/* Header */}
            <div className="flex w-full flex-col gap-[6px] text-white">
              <h2 className="text-[24px] font-extrabold leading-[33px]">
                Request Your Project Blueprint
              </h2>
              <p className="text-[14px] font-medium leading-[19px]">
                Get a custom layout, cost range &amp; 150-day* timeline
              </p>
            </div>

            {/* Fields: placeholders only, as in the design */}
            <div className="flex w-full flex-col gap-3">
              <div>
                <input
                  name="name"
                  type="text"
                  aria-label="Full name"
                  placeholder="Enter Your name"
                  value={values.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                  className={`${FIELD_CLASS} px-[18px] ${invalid("name")}`}
                />
                {errors.name ? <p className={MobileERROR_CLASS}>{errors.name}</p> : null}
              </div>

              <div>
                <input
                  name="projectLocation"
                  type="text"
                  aria-label="Project location"
                  placeholder="Enter Project Location"
                  value={values.projectLocation}
                  onChange={handleChange}
                  className={`${FIELD_CLASS} px-[22px]`}
                />
              </div>

              <div>
                <input
                  name="phoneNumber"
                  type="tel"
                  inputMode="tel"
                  maxLength={16}
                  aria-label="Mobile number"
                  placeholder="Mobile Number*"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.phoneNumber)}
                  className={`${FIELD_CLASS} px-[18px] ${invalid("phoneNumber")}`}
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
                  className={`${FIELD_CLASS} px-[18px] ${invalid("email")}`}
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
                    className={`${FIELD_CLASS} cursor-pointer appearance-none pl-[22px] pr-[34px] ${selectTone("industryType")} ${invalid("industryType")}`}
                  >
                    <option value="" disabled>
                      Select your Industry type
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
                    className="pointer-events-none absolute right-[22px] top-1/2 block size-[15px] -translate-y-1/2 rotate-90"
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
                    className={`${FIELD_CLASS} cursor-pointer appearance-none pl-[22px] pr-[34px] ${selectTone("sqft")} ${invalid("sqft")}`}
                  >
                    <option value="" disabled>
                      Select Sq.ft Requirement
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
                    className="pointer-events-none absolute right-[22px] top-1/2 block size-[15px] -translate-y-1/2 rotate-90"
                  />
                </div>
                {errors.sqft ? <p className={MobileERROR_CLASS}>{errors.sqft}</p> : null}
              </div>

              <div>
                <textarea
                  name="requirements"
                  rows={1}
                  aria-label="Requirement details"
                  placeholder="Enter Requirement Details"
                  value={values.requirements}
                  onChange={handleChange}
                  className={`${FIELD_CLASS} resize-none px-[22px] py-[13px]`}
                />
              </div>
            </div>

            {/* Submit + reassurance note */}
            <div className="flex w-full flex-col items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center rounded-[10px] bg-[#c4161c] px-6 py-[13px] text-center text-[14px] font-bold leading-[19px] text-[#f5f5f5] drop-shadow-[0px_8.81px_17.62px_rgba(196,22,28,0.3)] transition-colors hover:bg-[#ad1318] disabled:cursor-not-allowed disabled:opacity-80"
              >
                {isSubmitting ? "Submitting..." : "Get a Free Quote →"}
              </button>
              <p className="w-full text-center text-[12px] font-medium leading-[normal] text-[#c1c1c1]">
                100% Transparent Consultation with single point project support
              </p>
              {submitError ? (
                <p role="alert" className="text-center text-[12px] text-[#ff8a8a]">
                  {submitError}
                </p>
              ) : null}
            </div>
          </form>

          {/* WhatsApp + Call Now pills */}
          <div className="ml-4 flex w-[311px] max-w-full items-start justify-center gap-[14px]">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-[140px] items-center justify-center gap-2 rounded-full bg-white px-5 py-[14px] text-[14px] font-bold leading-[20px] text-[#e5091f]"
            >
              WhatsApp
              <span className="relative block size-[18px] shrink-0 overflow-hidden">
                <span
                  className="absolute inset-y-0 left-0 right-[0.48%] [mask-repeat:no-repeat] [mask-size:18px_18px]"
                  style={{ maskImage: "url(/hero/icons/whatsapp-mask.svg)" }}
                >
                  <img
                    src="/hero/icons/whatsapp.svg"
                    alt=""
                    width={18}
                    height={18}
                    className="absolute inset-0 block size-full max-w-none"
                  />
                </span>
              </span>
            </a>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex w-[140px] items-center justify-center gap-2 rounded-full border border-solid border-white px-5 py-[14px] text-[14px] font-bold leading-[20px] text-white"
            >
              Call Now
              <img
                src="/hero/icons/phone-call.svg"
                alt=""
                width={18}
                height={18}
                className="block size-[18px] shrink-0"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
