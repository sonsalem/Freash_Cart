import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <main>
      <Navbar />
      <div className="h-[calc(100svh-64px)] overflow-y-auto" dir="ltr">
        <div dir={locale === "en" ? "ltr" : "rtl"}>
          <ToastContainer rtl={locale == "ar" ? true : false} />
          {children}
          <Footer />
        </div>
      </div>
    </main>
  );
}
