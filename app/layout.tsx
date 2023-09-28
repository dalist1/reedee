import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import TanStackProvider from "./providers";
import { cn } from "@/lib/utils";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

const APP_NAME = "Reedee";
const APP_DESCRIPTION = "Enable your reading superpower.";

export const metadata: Metadata = {
  applicationName: APP_NAME,

  title: {
    default: APP_NAME,
    template: "%s",
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  themeColor: "#000000",
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
    <html lang="en">
      <body
        className={cn(
          "bg-[url('..//public/Looper.svg')] bg-black",
          poppins.className
        )}
        style={{ backgroundSize: "cover" }}
      >
        <TanStackProvider>{children}</TanStackProvider>
      </body>
    </html>
  );
}
