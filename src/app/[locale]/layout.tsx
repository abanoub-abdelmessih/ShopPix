import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { Header } from "@/components/shared/header/Header";
import { routing } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  const isRTL = locale === "ar";
  const direction = isRTL ? "rtl" : "ltr";
  const fontClass = isRTL ? "font-cairo" : "font-poppins";

  return (
    <div
      className={`min-h-screen flex flex-col ${fontClass} ${
        isRTL ? "rtl" : "ltr"
      }`}
      dir={direction}
      lang={locale}
    >
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
        now={new Date()}
        timeZone="UTC"
      >
        <Header />
        {children}
      </NextIntlClientProvider>
      <ScrollToTopButton />
    </div>
  );
};

export default Layout;
