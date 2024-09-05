import { IBM_Plex_Mono, Inter, JetBrains_Mono } from "next/font/google";

export const fontSans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-mono",
});

export const fontCode = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "optional",
  variable: "--font-code",
  fallback: ["monospace"],
});
