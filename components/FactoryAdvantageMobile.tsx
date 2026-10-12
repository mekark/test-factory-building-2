"use client";

import Image from "next/image";
import { useState } from "react";

/* ============================================================
   MOBILE FACTORY ADVANTAGE (Figma "Why Top Industries Choose Mekark", 390 × 650)
   Shown below 1280px only; the desktop section is untouched.
   ============================================================ */

// Six accordion rows. Each opens to reveal a short description.
const POINTS = [
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

export default function FactoryAdvantageMobile() {
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
          {POINTS.map((point, index) => {
            const isOpen = openIndex === index;
            const isFirst = index === 0;
            const isLast = index === POINTS.length - 1;
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
