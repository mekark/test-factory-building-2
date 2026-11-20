"use client";

import { PROCESS_STEPS } from "./sectionContent";
import { Space_Grotesk } from "next/font/google";
import { useRef } from "react";
import { useIsDesktop } from "./ViewportContext";
import { useCanvasZoom } from "./useCanvasZoom";

// Space Grotesk: the red step numbers (per Figma). Everything else is Manrope.
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["700"] });

/* ============================================================
   CONTENT DATA
   ============================================================ */

// Each icon is a Figma export with built-in padding, so `box` is the inset of
// the visible glyph inside the 40px icon frame and `img` is the SVG's overflow
// (both copied from the design).
type Step = {
  number: string;
  title: string;
  description: string;
  icon: string;
  iconSize: number;
  box?: string;
  img?: string;
  gap: number; // space between icon tile and text block
  titleWidth?: number; // Figma fixes some title widths, which decides where they wrap
  titleLeading: number;
  descWidth?: number;
};

const STEP_LAYOUT: Omit<Step, "number" | "title" | "description">[] = [
  {
    icon: "/process/clipboard-check.svg",
    iconSize: 40,
    box: "inset-[8.33%_16.67%]",
    img: "inset-[-4.13%_-5.16%]",
    gap: 53,
    titleLeading: 24,
  },
  {
    icon: "/process/drafting-compass.svg",
    iconSize: 40,
    box: "inset-[12.5%]",
    img: "inset-[-4.58%_-4.58%_-4.59%_-4.58%]",
    gap: 53,
    titleWidth: 221,
    titleLeading: 24,
  },
  {
    icon: "/process/hard-hat.svg",
    box: "inset-[16.67%_8.33%_20.83%_8.33%]",
    img: "inset-[-5.5%_-4.13%_-5.5%_-4.12%]",
    iconSize: 40,
    gap: 53,
    titleLeading: 22.667,
  },
  {
    icon: "/process/cable.svg",
    box: "inset-[12.5%_8.33%]",
    img: "inset-[-4.58%_-4.13%]",
    iconSize: 40,
    gap: 54,
    titleWidth: 271,
    titleLeading: 24,
  },
  {
    icon: "/process/shield-check.svg",
    iconSize: 40,
    box: "inset-[8.33%_16.67%_8.32%_16.67%]",
    img: "inset-[-4.12%_-5.16%]",
    gap: 53,
    titleLeading: 24,
    descWidth: 271,
  },
  {
    icon: "/process/handshake.svg",
    iconSize: 40,
    box: "inset-[12.5%_8.33%_11.99%_8.33%]",
    img: "inset-[-4.55%_-4.13%]",
    gap: 54,
    titleLeading: 24,
  },
];

const STEPS: Step[] = STEP_LAYOUT.map((layout, i) => ({
  ...PROCESS_STEPS[i],
  ...layout,
}));

/* ============================================================
   PROCESS SECTION
   ============================================================ */

export default function ProcessSection() {
  const canvasRef = useRef<HTMLDivElement>(null);
  useCanvasZoom(canvasRef);

  const isDesktop = useIsDesktop();
  if (!isDesktop) {
    return (
      <section id="process" className="overflow-hidden bg-[#f9f6f7] font-sans">
        <ProcessMobile />
      </section>
    );
  }

  return (
    /* ==========================================================
       SECTION WRAPPER — full-bleed #f9f6f7, 1920×726 design canvas
       ========================================================== */
    <section id="process" className="overflow-hidden bg-[#f9f6f7] font-sans">

      {/* ---------- Desktop layout (1280px and up): unchanged ---------- */}
      <div>
        {/* ---------- Design canvas (zoomed to the viewport on desktop) ---------- */}
        <div
          ref={canvasRef}
          className="canvas-zoom mx-auto w-full px-5 py-14 sm:px-8 sm:py-16 xl:w-[1920px] xl:p-[80px]"
        >
          <div className="flex flex-col items-start gap-[32px] sm:gap-[40px] xl:gap-[50px]">
            {/* ---------- Heading + sub-heading ---------- */}
            <div className="flex flex-col items-start gap-[12px] xl:gap-[16px]">
              <h2 className="text-[40px] font-bold leading-[1.15] text-[#0f172a] sm:text-[54px] xl:whitespace-nowrap xl:text-[66px] xl:leading-[73.333px]">
                Our <span className="text-[#ed1d23]">Turnkey Factory</span>{" "}
                Construction Process
              </h2>
              <p
                className={`text-[16px] font-normal leading-[1.5] text-[#64748b] sm:text-[18px] xl:w-[1083px] xl:text-[24px] xl:leading-[32px]`}
              >
                As a turnkey factory contractor and industrial EPC company, we
                take you from the first consultation to final handover through
                a proven 6-step process.
              </p>
            </div>

            {/* ---------- Steps grid: 6 columns on desktop, bottom rule beneath ---------- */}
            <div className="relative grid w-full grid-cols-1 gap-x-[28px] gap-y-[40px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(6,minmax(0,1fr))] xl:gap-y-[30px]">
              {/* Connector line running through the centres of the six icon tiles */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-[50px] top-[45.33px] hidden h-[1.333px] w-[calc((100%-140px)*5/6+140px)] bg-[#e4dfe0] xl:block"
              />

              {STEPS.map((step) => (
                <article
                  key={step.number}
                  className="flex flex-col items-start"
                  style={{ gap: step.gap }}
                >
                  {/* Icon tile: white card, 18px radius, #e4dfe0 hairline */}
                  <div className="relative z-10 h-[92px] w-[100px] shrink-0">
                    <div className="absolute left-0 top-[-0.33px] h-[92px] w-[100px] rounded-[18px] border-[0.917px] border-solid border-[#e4dfe0] bg-white" />
                    <div
                      className="absolute left-1/2 top-[calc(50%-0.33px)] -translate-x-1/2 -translate-y-1/2"
                      style={{ width: step.iconSize, height: step.iconSize }}
                    >
                      {step.box ? (
                        <div className={`absolute ${step.box}`}>
                          <div className={`absolute ${step.img}`}>
                            <img
                              src={step.icon}
                              alt=""
                              width={40}
                              height={40}
                              className="block size-full max-w-none"
                            />
                          </div>
                        </div>
                      ) : (
                        <img
                          src={step.icon}
                          alt=""
                          width={40}
                          height={40}
                          className="absolute inset-0 block size-full max-w-none"
                        />
                      )}
                    </div>
                  </div>

                  {/* Step number, title and description */}
                  <div className="flex w-full flex-col items-start gap-[12px]">
                    <p
                      className={`${spaceGrotesk.className} text-[26px] font-bold leading-[21.333px] text-[#ed1d23]`}
                    >
                      {step.number}
                    </p>
                    <h3
                      className="max-w-full text-[21px] font-bold text-[#1a1a1a]"
                      style={{
                        lineHeight: `${step.titleLeading}px`,
                        width: step.titleWidth,
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`max-w-full text-[18px] font-normal leading-[22.667px] text-[#64748b]`}
                      style={{ width: step.descWidth }}
                    >
                      {step.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   MOBILE / TABLET LAYOUT (below 1280px)
   Same section, same component file: ProcessSection renders either this
   layout or the desktop canvas above, never both.
   ============================================================ */

// MobileStep numbers use Space Grotesk, as in the design.
const MobileSpaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["700"] });

/* ============================================================
   MOBILE "OUR PROCESS" (Figma "Process MobileStep", 390 × 777)
   Shown below 1280px only; the desktop section is untouched.
   ============================================================ */

/* ============================================================
   STEP DATA
   `box` / `img` are the insets of the glyph inside the 20px icon frame and of
   the SVG's built-in padding (copied from Figma).
   ============================================================ */

type MobileStep = {
  number: string;
  title: string;
  description: string;
  icon: string;
  box: string;
  img: string;
};

const MobileSTEP_LAYOUT: Omit<MobileStep, "number" | "title" | "description">[] = [
  {
    icon: "/process/mobile/clipboard-check.svg",
    box: "inset-[8.33%_16.66%_8.34%_16.67%]",
    img: "inset-[-4.5%_-5.62%]",
  },
  {
    icon: "/process/mobile/drafting-compass.svg",
    box: "inset-[12.5%]",
    img: "inset-[-5%]",
  },
  {
    icon: "/process/mobile/hard-hat.svg",
    box: "inset-[16.67%_8.33%_20.84%_8.33%]",
    img: "inset-[-6%_-4.5%_-6.01%_-4.5%]",
  },
  {
    icon: "/process/mobile/cable.svg",
    box: "inset-[12.5%_8.33%]",
    img: "inset-[-5%_-4.5%]",
  },
  {
    icon: "/process/mobile/shield-check.svg",
    box: "inset-[8.33%_16.67%_8.32%_16.67%]",
    img: "inset-[-4.5%_-5.63%]",
  },
  {
    icon: "/process/mobile/handshake.svg",
    box: "inset-[12.5%_8.33%_12%_8.33%]",
    img: "inset-[-4.97%_-4.5%]",
  },
];

const MobileSTEPS: MobileStep[] = MobileSTEP_LAYOUT.map((layout, i) => ({
  ...PROCESS_STEPS[i],
  ...layout,
}));

function ProcessMobile() {
  return (
    /* ==========================================================
       MOBILE FRAME — white, one 350px column with 20px side padding
       ========================================================== */
    <div className="bg-white px-5 pb-12 pt-8 font-sans xl:hidden">
      <div className="mx-auto flex w-full flex-col items-start gap-[26px]">
        {/* ---------- Heading + sub-heading ---------- */}
        <div className="flex w-full flex-col items-start gap-[6px]">
          <h2 className="w-full text-[28px] font-bold leading-[34px] text-[#0f172a]">
            Our <span className="text-[#ed1d23]">Turnkey Factory</span>{" "}
            Construction Process
          </h2>
          <p className="w-full text-[14px] font-normal leading-[normal] text-[#64748b]">
            As a turnkey factory contractor and industrial EPC company, we take
            you from the first consultation to final handover through a proven
            6-step process.
          </p>
        </div>

        {/* ---------- Steps: dashed number badge on a vertical rule, card on the right ---------- */}
        <ol className="flex w-full flex-col gap-[26px]">
          {MobileSTEPS.map((step, index) => (
            <li key={step.number} className="relative flex items-center gap-[17px]">
              {/* Connector rule (centre of the 33px badge) with an 8px gap before and after each
                  badge: one piece runs up to the badge from the row above, one runs down from it */}
              {index > 0 ? (
                <span
                  aria-hidden
                  className="absolute left-[16px] top-[-26px] h-[calc(50%+26px-24.5px)] w-px bg-[#d2d2d2]"
                />
              ) : null}
              {index < MobileSTEPS.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute bottom-[-26px] left-[16px] top-[calc(50%+24.5px)] w-px bg-[#d2d2d2]"
                />
              ) : null}

              {/* Number badge: white circle with a dashed #bcbcbc outline */}
              <div
                className={`${MobileSpaceGrotesk.className} relative z-10 flex size-[33px] shrink-0 items-center justify-center bg-white pb-[1px] pl-[1px] text-[14px] font-bold leading-[normal] text-[#080808]`}
              >
                <svg
                  aria-hidden
                  viewBox="0 0 33 33"
                  className="absolute inset-0 size-full"
                  fill="none"
                >
                  <circle
                    cx="16.5"
                    cy="16.5"
                    r="16"
                    stroke="#bcbcbc"
                    strokeDasharray="4 3"
                  />
                </svg>
                <span className="relative">{step.number}</span>
              </div>

              {/* Card: icon + title + description */}
              <div className="flex min-w-0 flex-1 items-center gap-[10px] rounded-[6px] bg-[#fffcfc] py-[6px] pl-[10px] pr-[9px] drop-shadow-[-1px_1px_3px_rgba(30,30,30,0.1)]">
                <div className="relative size-[20px] shrink-0 overflow-hidden">
                  <div className={`absolute ${step.box}`}>
                    <div className={`absolute ${step.img}`}>
                      <img
                        src={step.icon}
                        alt=""
                        width={20}
                        height={20}
                        className="block size-full max-w-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex min-w-0 flex-1 flex-col items-start gap-px">
                  <h3 className="text-[16px] font-semibold leading-[24px] text-[#0f172a]">
                    {step.title}
                  </h3>
                  <p className="text-[12px] font-normal leading-[20px] text-[#64748b]">
                    {step.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
