import { OFFICES, OFFICE_SLOT } from "@/components/offices";

/**
 * "Our Locations" card for the CTA / lead section (same look as the PEB page):
 * 1 column on phones, 2 on tablet (Delhi full width), and from 1024px a 3-column
 * grid with Delhi spanning both rows. One list for every screen size.
 */
export default function OfficesDirectory({ className = "" }: { className?: string }) {
  return (
    <address
      className={`flex w-full flex-col rounded-[20px] border border-solid border-black/5 bg-[#212121] px-[16px] py-[16px] not-italic sm:rounded-[22px] sm:px-[20px] sm:py-[20px] min-[1024px]:px-[24px] min-[1024px]:py-[22px] ${className}`}
    >
      <div className="flex items-center gap-[16px]">
        <span className="flex size-[40px] shrink-0 items-center justify-center rounded-[8px] bg-[#CC000A] sm:size-[48px] sm:rounded-[16px]">
          <svg
            viewBox="0 0 24 24"
            className="size-[20px] shrink-0 text-white"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
          </svg>
        </span>
        <span className="flex flex-col">
          <span className="text-[10px] leading-[16px] font-bold text-[#A9A9A9] uppercase sm:text-[13px] sm:leading-[18px]">
            Offices across India
          </span>
          <span className="text-[14px] leading-[24px] font-extrabold text-white sm:text-[17px]">
            Our Locations
          </span>
        </span>
      </div>

      <div className="mt-[8px] grid grid-cols-1 gap-x-[24px] gap-y-[16px] border-t border-solid border-white/10 pt-[12px] sm:mt-[10px] sm:max-[1023px]:grid-cols-2 min-[1024px]:grid-cols-3 min-[1024px]:grid-rows-[auto_auto] min-[1024px]:items-start">
        {OFFICES.map((office, index) => (
          <div
            key={office.city}
            className={`flex flex-col gap-[4px] self-start ${OFFICE_SLOT[index] ?? ""}`}
          >
            <span className="text-[11px] font-bold tracking-[0.12em] text-[#FF4D55] uppercase sm:text-[12px]">
              {office.city}
            </span>
            <span className="text-[12px] leading-[1.55] text-white/70 sm:text-[13px]">
              {office.address}
            </span>
          </div>
        ))}
      </div>
    </address>
  );
}
