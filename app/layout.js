
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "../components/Providers"
import "./globals.css";

export const metadata = {
  title: "Doctor Appointment System",
  description: "Find trusted specialists and manage your healthcare journey.",
};

export default function RootLayout({ children }) {
  return (

    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}