import type { Metadata } from "next";
import { Poppins, Space_Grotesk } from "next/font/google";
import "@/app/globals.css";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { organizationJsonLd } from "@/lib/seo";

const poppins = Poppins({ subsets: ["latin"], variable: "--font-poppins", weight: ["400", "500", "600", "700"] });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "ro_RO"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro" className={`${poppins.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans">
        <JsonLd data={organizationJsonLd()} />
        <SiteHeader />
        <main className="mx-auto min-h-[70vh] w-full max-w-7xl px-4 pt-8 md:px-6">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
