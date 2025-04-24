import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/lib/react-query-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    template: `%s | Shoppix`,
    default: "Shoppix",
  },
  description: "Shop smart with Shoppix.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} font-inter`}
        suppressHydrationWarning
      >
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
