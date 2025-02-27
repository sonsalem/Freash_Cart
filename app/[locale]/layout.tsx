import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeContextProvider } from "@/context/ThemeContext";
import StoreProvider from "@/store/StoreProvider";
import QueryProvider from "@/components/QueryProvider";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "FreashCart",
  description: "Any Product You Need Is Here",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "en" ? "ltr" : "rtl"}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`antialiased dark:text-white dark:bg-dark-200 ${locale} overflow-y-clip`}
      >
        <NextTopLoader
          color="#0aad0a"
          height={5}
          crawl={false}
          showSpinner={false}
          shadow={false}
        />
        <QueryProvider>
          <StoreProvider>
            <ThemeContextProvider>
              <NextIntlClientProvider messages={messages}>
                {children}
              </NextIntlClientProvider>
            </ThemeContextProvider>
          </StoreProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
