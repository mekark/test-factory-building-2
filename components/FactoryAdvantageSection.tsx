"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useIsDesktop } from "./ViewportContext";
import { useCanvasZoom } from "./useCanvasZoom";

/* ============================================================
   CONTENT DATA
   each row opens to reveal its description.
   ============================================================ */

const POINTS = [
  {
    label: "Turnkey Factory Construction",
    description:
      "We take single-point accountability from design to handover. As a Turnkey Factory Construction Company and factory shed construction company, we ensure that our engineering, manufacturing, procurement and erection are done under one umbrella, which ensures that your project stays on track and within budget.",
  },
  {
    label: "In-House Structural Engineers",
    description:
      "As an industrial factory building contractor, we use BIM-based structural analysis to design every structure accurately before work begins. This makes us a dependable factory building contractor for large plants, with fewer on-site design changes.",
  },
  {
    label: "Foundations & Structures Designed for Your Loads",
    description:
      "We customise the design for your machinery, overhead cranes, mezzanines and floor loads. As a factory construction contractor, we size footings, pedestals and crane gantry supports for safe load transfer and vibration control.",
  },
  {
    label: "Factory Expansion Without Disrupting Production",
    description:
      "As your industrial construction contractor, Mekark connects design, civil works, structural steel, MEP and project execution through one EPC delivery model.",
  },
  {
    label: "Fully Automated Steel Production",
    description:
      "Factory extensions and manufacturing plant expansion can be considered during the original engineering, reducing what needs to be reworked when the facility grows.",
  },
  {
    label: "Safe Construction & Pre-Handover Inspection",
    description:
      "ISO 9001:2015 and CE-certified processes support fabrication quality with documentation your project and compliance teams can verify.",
  },
] as const;

// Desktop row widths from Figma: rows step in around the person, then back out.
const ROW_WIDTHS = [
  "xl:w-[700px]",
  "xl:w-[666px]",
  "xl:w-[645px]",
  "xl:w-[645px]",
  "xl:w-[666px]",
  "xl:w-[700px]",
] as const;

// Desktop min row heights from Figma (single-line rows are fixed-height; two-line rows size to content).
const ROW_MIN_HEIGHTS = ["xl:min-h-[60px]", "xl:min-h-[60px]", "", "", "xl:min-h-[67px]", ""] as const;

/* ============================================================
   FACTORY ADVANTAGE SECTION
   ============================================================ */

export default function FactoryAdvantageSection() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  useCanvasZoom(canvasRef);

  const isDesktop = useIsDesktop();
  if (!isDesktop) {
    return (
      <section className="overflow-hidden bg-white font-sans">
        <FactoryAdvantageMobile />
      </section>
    );
  }

  return (
    /* ==========================================================
       SECTION WRAPPER — 1920×865 design canvas
       ========================================================== */
    <section className="overflow-hidden bg-white font-sans">

      {/* ---------- Desktop layout (1280px and up): unchanged ---------- */}
      <div>
        {/* ---------- Design canvas (zoomed to the viewport on desktop) ---------- */}
        <div
          ref={canvasRef}
          className="canvas-zoom relative mx-auto flex w-full flex-col xl:block xl:h-[865.333px] xl:w-[1920px]"
        >
          {/* ======================================================
              PHOTO LAYERS — factory background, red panel, person cutout.
              Mobile: a banner on top. Desktop: absolutely positioned layers.
              ====================================================== */}
          <div className="relative h-[240px] w-full overflow-hidden sm:h-[380px] xl:absolute xl:inset-0 xl:h-auto xl:overflow-visible">
            {/* Layer 1: full-bleed factory photo with the "we build factories" billboard */}
            <Image
              width={1440}
              height={649}
              sizes="1920px"
              src="/advantage/background.webp"
              alt="Mekark factory under construction with a billboard reading: we build factories, you build future"
              className="pointer-events-none absolute inset-0 h-full w-full max-w-none object-cover xl:left-0 xl:top-[-0.33px] xl:h-[865.333px] xl:w-[1920px]"
            />

            {/* Layers 2–4 (desktop only): red L-shaped panel + dark gradient overlay */}
            <div className="absolute left-[1004px] top-0 hidden h-[568px] w-[916px] bg-[#e60f1a] xl:block" />
            <div className="absolute left-[1047px] top-[489px] hidden h-[224px] w-[873px] bg-[#e60f1a] xl:block" />
            <Image
              width={916}
              height={399}
              sizes="916px"
              src="/advantage/overlay-new.webp"
              alt=""
              className="pointer-events-none absolute left-[1004px] top-[-3px] hidden h-[398.667px] w-[916px] max-w-none object-cover xl:block"
            />

            {/* Layer 6: person cutout. Sits above the red panel, so it is
                rendered after the text on desktop (see the end of this block). */}
          </div>

          {/* ======================================================
              COPY — heading, sub-heading and the six points
              ====================================================== */}
          <div className="relative z-10 bg-[#e60f1a] bg-[linear-gradient(180deg,#2a0306_0%,#e60f1a_55%)] px-5 pb-12 pt-10 sm:px-8 sm:pt-12 xl:static xl:bg-none xl:p-0">
            {/* Heading + sub-heading stacked (22px gap) so a wrapped heading never overlaps the sub-heading */}
            <div className="xl:absolute xl:left-[1102px] xl:top-[25px] xl:flex xl:w-[783px] xl:flex-col xl:gap-[17px] xl:py-[6px]">
              {/* Heading (Bold 66px, #030303) */}
              <h2 className="text-[30px] font-extrabold leading-[1.15] tracking-[-0.03em] text-white sm:text-[40px] xl:text-[53.333px] xl:font-extrabold xl:leading-[60px] xl:tracking-[-1.3333px] xl:text-[#030303]">
                Why Top Industries <br className="hidden xl:block" />
                Choose Mekark
              </h2>

              {/* Sub-heading (Regular 20px, #424242) */}
              <p className="mt-4 text-[16px] font-normal leading-[1.5] text-[#ffd0d3] sm:text-[18px] xl:mt-0 xl:w-[709px] xl:text-[21.333px] xl:leading-[28px] xl:text-[#424242]">
                India’s Leading Industrial Factory Construction
              </p>
            </div>

            {/* Points list: right-aligned rows with staggered widths, bottom dividers and chevrons */}
            <ul className="mt-8 flex flex-col gap-[14px] xl:absolute xl:left-[1102px] xl:top-[214px] xl:mt-0 xl:h-[499px] xl:w-[710px] xl:items-end xl:gap-[10px] xl:overflow-y-auto xl:pt-[5px] xl:[scrollbar-width:none] xl:[&::-webkit-scrollbar]:hidden">
              {POINTS.map((point, i) => (
                <li
                  key={point.label}
                  className={`shrink-0 text-white ${ROW_WIDTHS[i]} ${ROW_MIN_HEIGHTS[i]} ${i === POINTS.length - 1 ? "" : "border-b-[1.333px] border-[#e58282]"}`}
                >
                  <button
                    type="button"
                    aria-expanded={openIndex === i}
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="flex w-full cursor-pointer items-center gap-[10px] font-sans text-left xl:gap-[15px] xl:pb-[13.333px] xl:pt-[12px]"
                  >
                    <span className="text-[18px] font-bold leading-[26px] sm:text-[22px] xl:self-start xl:w-[22px] xl:shrink-0 xl:text-[24px] xl:leading-[29.867px]">
                      {i + 1}.
                    </span>
                    <span className="block flex-1 text-[18px] font-bold leading-[26px] sm:text-[22px] sm:leading-[30px] xl:w-[492px] xl:flex-none xl:text-[24px] xl:leading-[29.867px]">
                      {point.label}
                    </span>
                    <img
                      src="/advantage/chevron.svg"
                      alt=""
                      width={30}
                      height={30}
                      className={`block size-[30px] shrink-0 xl:ml-auto transition-transform duration-300 ${openIndex === i ? "-rotate-90" : "rotate-90"}`}
                    />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ${openIndex === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-[14px] pl-[37px] pr-[40px] text-[17px] font-medium leading-normal text-white xl:w-[632px]">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Layer 6: person cutout, on top of every other layer (desktop only) */}
          <Image
            width={1440}
            height={649}
            sizes="1920px"
            src="/advantage/person.webp"
            alt=""
            className="pointer-events-none absolute left-0 top-[-0.33px] hidden h-[865.333px] w-[1920px] max-w-none xl:block"
            style={{ clipPath: "inset(0 776px 0 0)" }}
          />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   MOBILE / TABLET LAYOUT (below 1280px)
   Same section, same component file: FactoryAdvantageSection renders either this
   layout or the desktop canvas above, never both.
   ============================================================ */

/* ============================================================
   MOBILE FACTORY ADVANTAGE (Figma "Why Top Industries Choose Mekark", 390 × 650)
   Shown below 1280px only; the desktop section is untouched.
   ============================================================ */

// Six accordion rows. Each opens to reveal a short description.
const MobilePOINTS = [
  {
    label: "Cost Shaped Before Site",
    description:
      "Value engineering reviews structural choices and material use early, helping control project cost before fabrication and construction begin.",
  },
  {
    label: "Production Shapes the Building",
    description:
      "Equipment loads, movement, utilities and future expansion are considered while the industrial building is being engineered.",
  },
  {
    label: "Schedule Starts in Our Factory",
    description:
      "With 6,00,000 sq. ft. of manufacturing space and 40,000 MT annual fabrication capacity, structural steel production stays directly within Mekark's project control.",
  },
  {
    label: "One Turnkey Responsibility",
    description:
      "As your industrial construction contractor, Mekark connects design, civil works, structural steel, MEP and project execution through one EPC delivery model.",
  },
  {
    label: "Expansion Planned Forward",
    description:
      "Factory extensions and manufacturing plant expansion can be considered during the original engineering, reducing what needs to be reworked when the facility grows.",
  },
  {
    label: "Compliance Built In",
    description:
      "ISO 9001:2015 and CE-certified processes support fabrication quality with documentation your project and compliance teams can verify.",
  },
] as const;

function FactoryAdvantageMobile() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    /* ==========================================================
       MOBILE FRAME — one 390px column
       ========================================================== */
    <div className="w-full bg-[#f9f6f7] font-sans xl:hidden">
      {/* ---------- Photo banner: factory billboard with the person cutout ---------- */}
      <div className="relative h-[249px] w-full overflow-hidden">
        <Image
          src="/advantage/mobile-banner.webp"
          alt="Mekark factory under construction with a billboard reading: we build factories, you build future"
          width={1200}
          height={541}
          sizes="100vw"
          priority
          className="pointer-events-none absolute inset-0 h-full w-full max-w-none object-cover object-[30%_40%]"
        />
      </div>

      {/* ---------- Copy panel: white fading into brand red ---------- */}
      <div className="flex flex-col items-center gap-[10px] bg-[linear-gradient(180deg,#fffdfd_6.034%,#e60f1a_47.028%)] px-5 pb-[30px] pt-5">
        {/* Heading + sub-heading */}
        <div className="flex w-full flex-col items-start gap-3">
          {/* Figma trims the heading's text box to cap height (about 7px off top and bottom) */}
          <h2 className="-mb-[6px] -mt-[8px] w-full text-[28px] font-bold leading-[34px] text-[#030303]">
            Why Top Industries
            <br />
            Choose Mekark
          </h2>
          <p className="w-full text-[12px] font-normal leading-[19px] text-[#424242]">
            India’s Leading Industrial Factory Construction
          </p>
        </div>

        {/* Accordion: a thin rose rule between rows, none after the last */}
        <ul className="flex w-full flex-col">
          {MobilePOINTS.map((point, index) => {
            const isOpen = openIndex === index;
            const isFirst = index === 0;
            const isLast = index === MobilePOINTS.length - 1;
            return (
              <li
                key={point.label}
                className={`w-full pb-[10px] ${isFirst ? "" : "pt-[10px]"} ${isLast ? "" : "border-b border-solid border-[#e58282]"}`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex min-h-[26px] w-full cursor-pointer font-sans items-center gap-[10px] text-left text-[16px] font-bold leading-[18px] text-white"
                >
                  <span className="w-[24px] shrink-0">{index + 1}.</span>
                  <span className="min-w-0 flex-1">{point.label}</span>
                  <img
                    src="/advantage/chevron.svg"
                    alt=""
                    width={26}
                    height={26}
                    className={`block size-[26px] shrink-0 transition-transform duration-300 ${isOpen ? "-rotate-90" : "rotate-90"}`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="pl-[24px] pr-[26px] pt-[10px] text-[14px] font-medium leading-[17px] text-white">
                      {point.description}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
