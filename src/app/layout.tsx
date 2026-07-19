import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { WhatsAppFab } from "@/components/whatsapp-fab";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kenova Learning | Learn Today, Lead Tomorrow",
  description:
    "Expert tuition for Classes 1 to 10 — Kerala State Syllabus & CBSE Curriculum in English and Malayalam Medium. Personalized attention, experienced teachers, and proven results.",
  keywords: [
    "Best Tuition Centre",
    "CBSE Tuition",
    "Kerala State Tuition",
    "Classes 1 to 10",
    "English Medium Tuition",
    "Malayalam Medium Tuition",
    "Tuition Centre Kerala",
    "Kenova Learning",
  ],
  openGraph: {
    title: "Kenova Learning | Learn Today, Lead Tomorrow",
    description:
      "Expert tuition for Classes 1–10. Kerala State & CBSE. English & Malayalam Medium.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <WhatsAppFab />
      </body>
    </html>
  );
}
