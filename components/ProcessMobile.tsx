"use client";

import { Space_Grotesk } from "next/font/google";

// Step numbers use Space Grotesk, as in the design.
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["700"] });

/* ============================================================
   MOBILE "OUR PROCESS" (Figma "Process Step", 390 × 777)
   Shown below 1280px only; the desktop section is untouched.
   ============================================================ */

/* ============================================================
   STEP DATA
   `box` / `img` are the insets of the glyph inside the 20px icon frame and of
   the SVG's built-in padding (copied from Figma).
   ============================================================ */

type Step = {
  number: string;
  title: string;
  description: string;
  icon: string;
  box: string;
  img: string;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "Site & Project Feasibility",
    description: "Geotechnical, regulatory, and budget checks.",
    icon: "/process/mobile/clipboard-check.svg",
    box: "inset-[8.33%_16.66%_8.34%_16.67%]",
    img: "inset-[-4.5%_-5.62%]",
  },
  {
    number: "02",
    title: "Design & Engineering",
    description: "In-house engineering, plant layout and utility planning.",
    icon: "/process/mobile/drafting-compass.svg",
    box: "inset-[12.5%]",
    img: "inset-[-5%]",
  },
  {
    number: "03",
    title: "Civil Works & PEB",
    description:
      "Disciplined sequencing of civil works, steel framing and infrastructure.",
    icon: "/process/mobile/hard-hat.svg",
    box: "inset-[16.67%_8.33%_20.84%_8.33%]",
    img: "inset-[-6%_-4.5%_-6.01%_-4.5%]",
  },
  {
    number: "04",
    title: "MEP Integration",
    description:
      "Electrical systems, piping, mechanical works and utility services.",
    icon: "/process/mobile/cable.svg",
    box: "inset-[12.5%_8.33%]",
    img: "inset-[-5%_-4.5%]",
  },
  {
    number: "05",
    title: "Quality Validation",
    description: "Inspection, installation & compliance checks.",
    icon: "/process/mobile/shield-check.svg",
    box: "inset-[8.33%_16.67%_8.32%_16.67%]",
    img: "inset-[-4.5%_-5.63%]",
  },
  {
    number: "06",
    title: "Handover & After-Sales",
    description: "Snag clearance, documentation, and support.",
    icon: "/process/mobile/handshake.svg",
    box: "inset-[12.5%_8.33%_12%_8.33%]",
    img: "inset-[-4.97%_-4.5%]",
  },
];

export default function ProcessMobile() {
  return (
    /* ==========================================================
       MOBILE FRAME — white, one 350px column with 20px side padding
       ========================================================== */
    <div className="bg-white px-5 pb-12 pt-8 font-sans xl:hidden">
      <div className="mx-auto flex w-full max-w-[350px] flex-col items-start gap-[26px]">
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
          {STEPS.map((step, index) => (
            <li key={step.number} className="relative flex items-center gap-[17px]">
              {/* Connector rule (centre of the 33px badge) with an 8px gap before and after each
                  badge: one piece runs up to the badge from the row above, one runs down from it */}
              {index > 0 ? (
                <span
                  aria-hidden
                  className="absolute left-[16px] top-[-26px] h-[calc(50%+26px-24.5px)] w-px bg-[#d2d2d2]"
                />
              ) : null}
              {index < STEPS.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute bottom-[-26px] left-[16px] top-[calc(50%+24.5px)] w-px bg-[#d2d2d2]"
                />
              ) : null}

              {/* Number badge: white circle with a dashed #bcbcbc outline */}
              <div
                className={`${spaceGrotesk.className} relative z-10 flex size-[33px] shrink-0 items-center justify-center bg-white pb-[1px] pl-[1px] text-[14px] font-bold leading-[normal] text-[#080808]`}
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
