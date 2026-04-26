import localFont from "next/font/local";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import Navbar from "./components/ui/Navbar";

const sharone = localFont({
  src: "../public/fonts/Sharone.woff2",
  variable: "--font-sharone",
  display: "swap",
});

const clashGrotesk = localFont({
  src: [
    { path: "../public/fonts/ClashGrotesk-Medium.woff2",   weight: "500" },
    { path: "../public/fonts/ClashGrotesk-Semibold.woff2", weight: "600" },
  ],
  variable: "--font-clash",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata = {
  icons: {
    icon: [{ url: "/favicon.png", sizes: "2084x2084", type: "image/png" }],
    shortcut: "/favicon.png",
    apple: [{ url: "/favicon.png", sizes: "2084x2084", type: "image/png" }],
  },
  title: "Fazen — Graphic Designer & Creativepreneur",
  description:
    "Hafaz Sofyan — Graphic Designer with 5+ years of experience. Specializing in Logo & Brand Identity, Social Media, Presentation, and Marketing Design.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${sharone.variable} ${clashGrotesk.variable} ${interTight.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
          <Navbar />
          {children}
        </body>
    </html>
  );
}
