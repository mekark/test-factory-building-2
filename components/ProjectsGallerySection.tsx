"use client";

import { GALLERY_ALTS } from "./sectionContent";
import Image from "next/image";
import { CSSProperties, useRef } from "react";
import { useIsDesktop } from "./ViewportContext";
import { useCanvasZoom } from "./useCanvasZoom";

/* ============================================================
   GALLERY TILES
   x/y/w/h place each tile on the 1920×1736 desktop canvas (a 2×3 grid, 25px
   gap). `crop` is Figma's custom image placement inside the tile; `radius`
   rounds only the grid's outer corners. Below 1280px the tiles flow into a
   2-column grid and these values are ignored.
   ============================================================ */

type Tile = {
  id: string;
  src: string;
  alt: string;
  x: number;
  y: number;
  w: number;
  h: number;
  radius: string;
  crop?: { left: string; top: string; width: string; height: string };
};

const TILES: Tile[] = [
  {
    id: "a",
    src: "/projects/gallery-1.webp",
    alt: GALLERY_ALTS[0],
    x: 80, y: 168.3, w: 867.5, h: 488.5,
    radius: "xl:rounded-tl-[32px]",
    crop: { left: "0.02%", top: "0%", width: "101.65%", height: "101.74%" },
  },
  {
    id: "b",
    src: "/projects/gallery-2.webp",
    alt: GALLERY_ALTS[1],
    x: 972.5, y: 168.3, w: 867.5, h: 488.5,
    radius: "xl:rounded-tr-[32px]",
    crop: { left: "-5.01%", top: "-2.5%", width: "104.97%", height: "104.97%" },
  },
  {
    id: "c",
    src: "/projects/gallery-3.webp",
    alt: GALLERY_ALTS[2],
    x: 80, y: 681.8, w: 867.5, h: 488.5,
    radius: "xl:rounded-bl-[32px]",
    crop: { left: "-11.16%", top: "-2.25%", width: "119.17%", height: "119.15%" },
  },
  {
    id: "d",
    src: "/projects/gallery-4.webp",
    alt: GALLERY_ALTS[3],
    x: 972.5, y: 681.8, w: 867.5, h: 488.5,
    radius: "xl:rounded-br-[32px]",
  },
  {
    id: "e",
    src: "/projects/gallery-5.webp",
    alt: GALLERY_ALTS[4],
    x: 80, y: 1195.3, w: 867.5, h: 488.5,
    radius: "xl:rounded-bl-[32px]",
  },
  {
    id: "f",
    src: "/projects/gallery-6.webp",
    alt: GALLERY_ALTS[5],
    x: 972.5, y: 1195.3, w: 867.5, h: 488.5,
    radius: "xl:rounded-br-[32px]",
    crop: { left: "-10.82%", top: "-10.66%", width: "110.81%", height: "110.75%" },
  },
];

/* ============================================================
   PROJECTS GALLERY SECTION
   ============================================================ */

export default function ProjectsGallerySection() {
  const canvasRef = useRef<HTMLDivElement>(null);
  useCanvasZoom(canvasRef);

  const isDesktop = useIsDesktop();
  if (!isDesktop) {
    return (
      <section className="overflow-hidden bg-[#f9f6f7] font-sans">
        <ProjectsGalleryMobile />
      </section>
    );
  }

  return (
    /* ==========================================================
       SECTION WRAPPER — full-bleed #f9f6f7, 1920×1736 design canvas
       ========================================================== */
    <section className="overflow-hidden bg-[#f9f6f7] font-sans">

      {/* ---------- Desktop layout (1280px and up): unchanged ---------- */}
      <div>
        {/* ---------- Design canvas (zoomed to the viewport on desktop) ---------- */}
        <div
          ref={canvasRef}
          className="canvas-zoom relative mx-auto w-full px-5 py-12 sm:px-8 sm:py-16 xl:h-[1736px] xl:w-[1920px] xl:p-0"
        >
          {/* ======================================================
              HEADING — eyebrow, two-tone title, sub-heading
              ====================================================== */}
          <div className="relative flex flex-col items-start gap-[14px] xl:absolute xl:left-[80px] xl:top-[52px] xl:w-[648px]">
            <div className="flex w-full flex-col items-start gap-[13px] font-bold xl:w-[509px]">
              <p className="w-full text-[13px] font-bold uppercase leading-[21.304px] tracking-[1.5978px] text-[#ed1d23] xl:text-[16px]">
                our work
              </p>
              <h2 className="w-full text-[40px] font-bold leading-[1.1] text-[#0f172a] sm:text-[54px] xl:text-[66px] xl:leading-[60px]">
                Projects <span className="text-[#ed1d23]">Gallery</span>
              </h2>
            </div>
          </div>

          {/* ======================================================
              PHOTO GRID — six tiles, rounded only on the outer corners
              ====================================================== */}
          <div className="relative mt-8 grid grid-cols-2 gap-3 sm:gap-4 xl:mt-0 xl:block">
            {TILES.map((tile) => {
              // Desktop geometry is passed through CSS variables (read by the xl: classes).
              const vars = {
                "--x": `${tile.x}px`,
                "--y": `${tile.y}px`,
                "--w": `${tile.w}px`,
                "--h": `${tile.h}px`,
                ...(tile.crop && {
                  "--cl": tile.crop.left,
                  "--ct": tile.crop.top,
                  "--cw": tile.crop.width,
                  "--ch": tile.crop.height,
                }),
              } as CSSProperties;

              return (
                <div
                  key={tile.id}
                  style={vars}
                  className={`relative aspect-[4/3] overflow-hidden rounded-[16px] bg-[#d9d9d9] xl:absolute xl:left-[var(--x)] xl:top-[var(--y)] xl:aspect-auto xl:h-[var(--h)] xl:w-[var(--w)] xl:rounded-none ${tile.radius}`}
                >
                  {tile.crop ? (
                    // Cropped tiles: the photo is placed and stretched exactly as in Figma on desktop
                    <div className="absolute inset-0 xl:inset-auto xl:left-[var(--cl)] xl:top-[var(--ct)] xl:h-[var(--ch)] xl:w-[var(--cw)]">
                      <Image
                        src={tile.src}
                        alt={tile.alt}
                        fill
                        sizes="(min-width: 1280px) 900px, 100vw"
                        className="object-cover xl:object-fill"
                      />
                    </div>
                  ) : (
                    <Image
                      src={tile.src}
                      alt={tile.alt}
                      fill
                      sizes="(min-width: 1280px) 720px, 50vw"
                      className="object-cover"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   MOBILE / TABLET LAYOUT (below 1280px)
   Same section, same component file: ProjectsGallerySection renders either this
   layout or the desktop canvas above, never both.
   ============================================================ */

/* ============================================================
   MOBILE PROJECTS GALLERY (Figma "Projects gallery", 390 × 1023)
   Shown below 1280px only; the desktop gallery is untouched.
   ============================================================ */

// Six full-width 180px tiles. `crop` is Figma's custom image placement inside
// the tile (the photo is stretched to these offsets); tile 4 simply covers.
const MobileTILES = [
  {
    src: "/projects/mobile/gallery-1.webp",
    alt: GALLERY_ALTS[0],
    crop: { left: "0.07%", top: "-0.25%", width: "102.11%", height: "111.85%" },
  },
  {
    src: "/projects/mobile/gallery-2.webp",
    alt: GALLERY_ALTS[1],
    crop: { left: "-3.71%", top: "-6.74%", width: "103.63%", height: "113.4%" },
  },
  {
    src: "/projects/mobile/gallery-3.webp",
    alt: GALLERY_ALTS[2],
    crop: { left: "0.02%", top: "-8.69%", width: "107.7%", height: "117.86%" },
  },
  {
    src: "/projects/mobile/gallery-4.webp",
    alt: GALLERY_ALTS[3],
  },
  {
    src: "/projects/mobile/gallery-5.webp",
    alt: GALLERY_ALTS[4],
  },
  {
    src: "/projects/mobile/gallery-6.webp",
    alt: GALLERY_ALTS[5],
    crop: { left: "-11.44%", top: "-17.22%", width: "111.54%", height: "122.06%" },
  },
] as const;

function ProjectsGalleryMobile() {
  return (
    /* ==========================================================
       MOBILE FRAME — full-width #f9f6f7 with one 390px column
       ========================================================== */
    <div className="bg-[#f9f6f7] font-sans xl:hidden">
      <div className="mx-auto flex w-full flex-col items-start gap-6 px-5 py-8">
        {/* ---------- Heading block ---------- */}
        <div className="flex w-full flex-col items-start gap-4 [word-break:break-word]">
          <div className="flex w-full flex-col items-start gap-[10px] font-bold">
            <p className="w-full text-[12px] font-bold uppercase leading-[18px] tracking-[1.5978px] text-[#ed1d23]">
              our work
            </p>
            <h2 className="whitespace-nowrap text-[28px] font-bold leading-[32px] text-[#0f172a]">
              Projects <span className="text-[#ed1d23]">Gallery</span>
            </h2>
          </div>
        </div>

        {/* ---------- Photo stack: six full-width tiles ---------- */}
        <div className="flex w-full flex-col gap-4">
          {MobileTILES.map((tile) => (
            <div key={tile.src} className="relative h-[180px] w-full overflow-hidden">
              {"crop" in tile ? (
                <div className="absolute" style={tile.crop}>
                  <Image
                    src={tile.src}
                    alt={tile.alt}
                    fill
                    sizes="400px"
                    className="object-fill"
                  />
                </div>
              ) : (
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  sizes="400px"
                  className="object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
