import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/lib/react-query-provider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600"],
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} font-inter`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <ScrollToTop />
            {children}
          </ReactQueryProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
