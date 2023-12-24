import "./globals.css";
import type { Metadata } from "next";
import TanStackProvider from "./providers";
import { Analytics } from '@vercel/analytics/react'

const APP_NAME = "Reedee";
const APP_DESCRIPTION = "Enable your reading superpower.";

import { Poppins, Gochi_Hand } from 'next/font/google';

export const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-poppins'
});

export const gochi_hand = Gochi_Hand({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-gochi-hand'
});

export const runtime = "edge";

export const metadata: Metadata = {
  applicationName: APP_NAME,

  title: {
    default: APP_NAME,
    template: "%s",
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className={`font-poppins ${gochi_hand.variable} w-full h-full`}>
        <TanStackProvider>
          {children}
          <Analytics />
        </TanStackProvider>
      </body>
    </html>
  );
}