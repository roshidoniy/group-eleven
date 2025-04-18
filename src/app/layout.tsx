import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { PT_Sans } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "../components/PostHogProvider";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const ptSans = PT_Sans({
  variable: "--font-pt-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Group 11",
  description: "This website helps to find links, because Platon is bloated. ",
  openGraph: {
    images: "/showcase.png"
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Group 11",
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${ptSans.variable} antialiased relative`}
      >
        <div className="texture" />
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
