import type { Metadata, Viewport } from "next";
import { Kanit } from "next/font/google";

import "./globals.css";

const kanit = Kanit({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Auto Anna",
  description: "OTP Heli",
  openGraph: {
    title: "Auto Anna",
    description: "OTP Heli",
    images: [
      {
        url: `./Logo.png`,
      },
    ],
  },
  alternates: {
    canonical: "https://www.labonion.com",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
