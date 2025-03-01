import type { Metadata } from "next";
import { Kanit } from "next/font/google";

import "./globals.css";

const kanit = Kanit({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Labonion",
  description:
    "Labonion is a marketing agent. Majorly meant for planning.",
  openGraph: {
    title: "Labonion",
    description:
    "Labonion is a marketing agent. Majorly meant for planning.",
      images: [
        {
          url: `./Logo.png`,
        },
      ],  },
  alternates: {
    canonical: "https://www.labonion.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${kanit.className} antialiased`}>{children}</body>
    </html>
  );
}
