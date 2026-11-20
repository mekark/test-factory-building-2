"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

// Desktop (Figma-canvas) layout starts at Tailwind's `xl` breakpoint.
const DESKTOP_QUERY = "(min-width: 1280px)";

const ViewportContext = createContext(true);

/**
 * Renders exactly ONE layout per section (mobile or desktop) so the DOM never
 * carries a hidden duplicate. The server picks the first layout from the
 * request's device hints; on mount the real viewport width takes over, so a
 * narrow desktop window or a tablet still ends up on the right layout.
 */
export function ViewportProvider({
  initialDesktop,
  children,
}: {
  initialDesktop: boolean;
  children: ReactNode;
}) {
  const [isDesktop, setIsDesktop] = useState(initialDesktop);

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    const sync = () => setIsDesktop(mql.matches);
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, []);

  return (
    <ViewportContext.Provider value={isDesktop}>
      {children}
    </ViewportContext.Provider>
  );
}

export function useIsDesktop() {
  return useContext(ViewportContext);
}
