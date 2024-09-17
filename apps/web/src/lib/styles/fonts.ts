import { IBM_Plex_Mono, Inter, JetBrains_Mono } from "next/font/google";
// import localFont from "next/font/local";

export const fontSans = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800", "900"],
});

// export const fontSans = localFont({
//   src: [
//     {
//       path: "./font-faces/ttf/MonaSans-ExtraLight.ttf",
//       style: "normal",
//       weight: "200",
//     },
//     {
//       path: "./font-faces/ttf/MonaSans-ExtraLightItalic.ttf",
//       style: "italic",
//       weight: "200",
//     },
//     {
//       path: "./font-faces/ttf/MonaSans-Light.ttf",
//       style: "normal",
//       weight: "300",
//     },
//     {
//       path: "./font-faces/ttf/MonaSans-LightItalic.ttf",
//       style: "italic",
//       weight: "300",
//     },
//     {
//       path: "./font-faces/ttf/MonaSans-Medium.ttf",
//       style: "normal",
//       weight: "500",
//     },
//     {
//       path: "./font-faces/ttf/MonaSans-MediumItalic.ttf",
//       style: "italic",
//       weight: "500",
//     },
//     {
//       path: "./font-faces/ttf/MonaSans-SemiBold.ttf",
//       style: "normal",
//       weight: "600",
//     },
//     {
//       path: "./font-faces/ttf/MonaSans-SemiBoldItalic.ttf",
//       style: "italic",
//       weight: "600",
//     },
//     {
//       path: "./font-faces/ttf/MonaSans-Regular.ttf",
//       style: "normal",
//       weight: "400",
//     },
//     {
//       path: "./font-faces/ttf/MonaSans-Bold.ttf",
//       style: "normal",
//       weight: "700",
//     },
//     {
//       path: "./font-faces/ttf/MonaSans-Italic.ttf",
//       style: "italic",
//       weight: "400",
//     },
//     {
//       path: "./font-faces/ttf/MonaSans-BoldItalic.ttf",
//       style: "italic",
//       weight: "700",
//     },
//     {
//       path: "./font-faces/ttf/MonaSans-ExtraBold.ttf",
//       style: "normal",
//       weight: "800",
//     },
//     {
//       path: "./font-faces/ttf/MonaSans-ExtraBoldItalic.ttf",
//       style: "italic",
//       weight: "800",
//     },
//   ],
//   variable: "--font-sans",
//   display: "swap",
// });

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
