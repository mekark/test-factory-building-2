import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import DeferredGoogleTagManager from "../components/DeferredGoogleTagManager";
import Footer from "../components/Footer";
import "./globals.css";

const GTM_ID = "GTM-5SBMM86H";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Turnkey Factory EPC Construction Company – Industrial Factory Turnkey EPC Contractor ",
  description:
    "Leading Turnkey Factory EPC & Turnkey Factory Construction Company – Turnkey Factory EPC expertise in In House PEB Manufacturing, Civil, PEB, MEP and Seamless Execution servicing the needs of Turnkey Industrial Building Contractor & Turnkey Industrial Construction Company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} relative overflow-x-hidden font-sans antialiased`}
      >
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <div className="relative">{children}</div>
        <Footer />
        <DeferredGoogleTagManager gtmId={GTM_ID} />
      </body>
    </html>
  );
}
