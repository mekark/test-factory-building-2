"use client";

import Image from "next/image";
import { CSSProperties, useRef, useState } from "react";
import { useIsDesktop } from "./ViewportContext";
import { FAQS } from "./faqData";
import { useCanvasZoom } from "./useCanvasZoom";

/* ============================================================
   FAQ SECTION
   ============================================================ */

export default function FaqSection() {
  const canvasRef = useRef<HTMLDivElement>(null);
  useCanvasZoom(canvasRef);

  // One answer open at a time; the first is open by default (as in the design).
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const isDesktop = useIsDesktop();
  if (!isDesktop) {
    return (
      <section id="faq" className="overflow-x-clip bg-[#f9f6f7] font-sans">
        <FaqMobile />
      </section>
    );
  }

  return (
    /* ==========================================================
       SECTION WRAPPER — full-bleed #f9f6f7, 1920×1472 design canvas
       ========================================================== */
    <section id="faq" className="overflow-x-clip bg-[#f9f6f7] font-sans">

      {/* ---------- Desktop layout (1280px and up): unchanged ---------- */}
      <div>
        {/* ---------- Design canvas (zoomed to the viewport on desktop) ---------- */}
        <div
          ref={canvasRef}
          className="canvas-zoom relative mx-auto flex w-full flex-col gap-10 px-5 py-14 sm:px-8 sm:py-16 xl:block xl:w-[1920px] xl:p-0 xl:pb-[110px]"
        >
          {/* ======================================================
              LEFT COLUMN — FAQ badge, heading, placeholder text, illustration
              ====================================================== */}
          {/* Desktop: the outer box is as tall as the whole canvas; the inner box is
              sticky, so it stays in view while the question list scrolls past. */}
          <div className="xl:absolute xl:inset-y-0 xl:left-[107px] xl:w-[692px]">
            <div className="flex flex-col items-start gap-[24px] xl:sticky xl:top-[20px] xl:mt-[28.67px] xl:gap-[37px]">
            <div className="flex w-full flex-col items-start gap-[25.467px]">
              {/* Badge */}
              <span className="flex items-center rounded-full border-[1.333px] border-solid border-[#fcd5d0] bg-[#feeae7] px-[20px] py-[9.333px] text-[16px] font-semibold leading-[26px] text-[#cc000a]">
                FAQ
              </span>

              {/* Heading: second line in red */}
              <h2 className="w-full text-[40px] font-bold leading-[1.2] text-[#070506] sm:text-[54px] xl:text-[66px] xl:leading-[81.6px]">
                Frequently asked
                <br />
                <span className="text-[#cc000a]">questions.</span>
              </h2>
            </div>

            {/* Factory illustration (square, transparent background) */}
            <div className="relative size-[280px] self-center sm:size-[380px] xl:size-[614px] xl:self-start xl:ml-[39px]">
              <Image
                src="/faq/factory.webp"
                alt="Illustration of an industrial factory building with a tall chimney"
                fill
                sizes="(min-width: 1280px) 614px, 380px"
                className="object-cover"
              />
            </div>
            </div>
          </div>

          {/* ======================================================
              RIGHT COLUMN — accordion list
              ====================================================== */}
          <div className="xl:ml-[901.44px] xl:pt-[110.33px] xl:w-[911.556px]">
            <ul>
              {FAQS.map((faq, index) => {
                const isOpen = openIndex === index;
                const number = index + 1;
                const isFirst = index === 0;

                // Row alignment: an open row bottom-aligns its larger rotated toggle;
                // closed rows use the per-row alignment recorded from Figma.
                const rowAlign = isOpen
                  ? "items-end"
                  : faq.align === "start"
                    ? "items-start"
                    : "items-center";

                return (
                  <li
                    key={faq.q}
                    // The 1.333px rule is an inset shadow so it sits inside the row like Figma's inside stroke
                    className={`shadow-[inset_0_-1.333px_0_#e2e2e2] pb-[24px] xl:pb-[33.333px] ${isFirst ? "pt-0" : "pt-[24px] xl:pt-[32px]"}`}
                  >
                    {/* Question row (button for keyboard + screen-reader access) */}
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      className={`flex w-full cursor-pointer justify-between gap-4 text-left xl:gap-0 ${rowAlign}`}
                    >
                      {/* Question text: numbered list marker (or typed number on two rows) */}
                      <span
                        className={`block text-[17px] font-medium leading-[26px] transition-colors duration-300 sm:text-[20px] sm:leading-[30px] xl:w-[var(--qw)] xl:shrink-0 xl:text-[24px] xl:leading-[32px] ${isOpen ? "text-[#c4161c]" : "text-[#080808]"}`}
                        style={{ "--qw": `${faq.width}px` } as CSSProperties}
                      >
                        {faq.literal ? (
                          <>
                            <span className={isOpen ? "" : "text-[#080808]"}>{` ${number}.`}</span>
                            {` ${faq.q}`}
                          </>
                        ) : (
                          <ol className="list-decimal" start={number}>
                            <li className="ms-[28px] xl:ms-[36px]">{faq.q}</li>
                          </ol>
                        )}
                      </span>

                      {/* Toggle: grey "+" when closed; red circle rotated into a "×" when open */}
                      {isOpen ? (
                        <span className="flex size-[44px] shrink-0 items-center justify-center xl:size-[52.797px]">
                          <span className="flex size-[32px] rotate-45 items-center justify-center rounded-full bg-[#c4161c] text-[18px] font-normal leading-[normal] text-[#f5f5f5] xl:size-[37.333px] xl:text-[21.333px]">
                            +
                          </span>
                        </span>
                      ) : (
                        <span className="flex size-[32px] shrink-0 items-center justify-center rounded-full bg-[#f0f0f0] text-[18px] font-normal leading-[normal] text-[#9a9a9a] xl:size-[37.333px] xl:text-[21.333px]">
                          +
                        </span>
                      )}
                    </button>

                    {/* Answer: slides open/closed (grid-rows trick, no fixed height) */}
                    <div
                      id={`faq-answer-${index}`}
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                    >
                      <div className="overflow-hidden">
                        <p className="mx-auto pt-[12px] text-[16px] font-medium leading-[26px] text-[#5a5a5a] sm:text-[18px] sm:leading-[28px] xl:w-[876px] xl:pt-[18.667px] xl:text-[20px] xl:leading-[30px]">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   MOBILE / TABLET LAYOUT (below 1280px)
   Same section, same component file: FaqSection renders either this
   layout or the desktop canvas above, never both.
   ============================================================ */

/* ============================================================
   MOBILE FAQ (Figma "faq-mobile", 390 × 1396)
   Shown below 1280px only; the desktop FAQ is untouched.
   Every row looks the same: typed number, 12px gap, a divider after each row.
   The questions and answers come from the same list as the desktop FAQ;
   the desktop-only fields (width / align / literal) are not used here.
   ============================================================ */

// A few questions start with a space in the design; it shows as a small indent.
const LEADING_SPACE_ROWS = new Set([1, 3, 4, 7, 9]);

function Divider() {
  // 1px #e2e2e2 rule, reaching 11px past the left edge of the 350px list.
  // The box has zero height (the line sits just above it), exactly like Figma,
  // so dividers don't add to the row spacing.
  return (
    <div aria-hidden className="relative h-0 w-[calc(100%+11px)] shrink-0 self-end">
      <span className="absolute inset-x-0 -top-px h-px bg-[#e2e2e2]" />
    </div>
  );
}

function FaqMobile() {
  // One answer open at a time; the first is open by default (as in the design).
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    /* ==========================================================
       MOBILE FRAME — full-width #f9f6f7 with one 390px column
       ========================================================== */
    <div className="bg-[#f9f6f7] font-sans xl:hidden">
      <div className="mx-auto flex w-full flex-col items-start gap-6 px-5 py-8">
        {/* ======================================================
            INTRO — label, heading, placeholder text, illustration
            ====================================================== */}
        <div className="flex w-full flex-col items-start gap-[21px]">
          <div className="flex flex-col items-start gap-3 px-5 py-[6px]">
            {/* Section label: short red bar + "FAQ" */}
            <div className="flex items-center gap-[10.667px]">
              <span aria-hidden className="h-[2.667px] w-[26.667px] shrink-0 bg-[#c4161c]" />
              <span className="whitespace-nowrap text-[14.667px] font-extrabold uppercase leading-[normal] tracking-[2.6667px] text-[#c4161c]">
                FAQ
              </span>
            </div>

            {/* Heading on two lines */}
            <h2 className="w-[309px] max-w-full text-[28px] font-bold leading-[32px] text-[#070506]">
              Frequently Asked
              <br />
              Questions
            </h2>
          </div>

          {/* Factory illustration (square, transparent background) */}
          <div className="relative aspect-square w-full max-w-[350px]">
            <Image
              src="/faq/factory.webp"
              alt="Illustration of an industrial factory building with a tall chimney"
              fill
              sizes="350px"
              className="object-cover"
            />
          </div>
        </div>

        {/* ======================================================
            ACCORDION LIST
            ====================================================== */}
        <ul className="flex w-full flex-col items-end gap-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const number = index + 1;

            return (
              <li key={faq.q} className="flex w-full flex-col items-end gap-3">
                <div className="flex w-full flex-col items-start overflow-hidden">
                  {/* Question row (a button, so it works with keyboard and screen readers) */}
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-m-answer-${index}`}
                    className="flex w-full cursor-pointer items-center gap-4 text-left"
                  >
                    <span
                      className={`min-w-0 flex-1 whitespace-pre-wrap text-[16px] font-medium leading-[24px] transition-colors duration-300 ${isOpen ? "text-[#c4161c]" : "text-[#080808]"}`}
                    >
                      {/* Row 1 has no space after its number in the design */}
                      {index === 0
                        ? `${number}.${faq.q}`
                        : `${LEADING_SPACE_ROWS.has(index) ? " " : ""}${number}. ${faq.q}`}
                    </span>

                    {/* Toggle: grey "+" when closed; red circle turned into a "×" when open */}
                    {isOpen ? (
                      <span className="flex size-[33.941px] shrink-0 items-center justify-center">
                        <span className="flex size-6 rotate-45 items-center justify-center rounded-full bg-[#c4161c] text-[21.333px] font-normal leading-[normal] text-[#f5f5f5]">
                          +
                        </span>
                      </span>
                    ) : (
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#f0f0f0] text-[21.333px] font-normal leading-[normal] text-[#9a9a9a]">
                        +
                      </span>
                    )}
                  </button>

                  {/* Answer: slides open/closed (grid-rows trick, no fixed height) */}
                  <div
                    id={`faq-m-answer-${index}`}
                    className={`grid w-full transition-[grid-template-rows,opacity] duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="pt-[10px] text-[14px] font-medium leading-[20px] text-[#5a5a5a]">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>

                <Divider />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
