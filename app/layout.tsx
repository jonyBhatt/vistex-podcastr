import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ConvexClientProvider from "@/components/ConvexClientProvider";

const manrope = Manrope({ subsets: ["latin"], variable: "--manrope" });

export const metadata: Metadata = {
  title: "Vistex",
  description: "Generate your podcast free with AI",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("font-manrope", manrope.variable)}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
