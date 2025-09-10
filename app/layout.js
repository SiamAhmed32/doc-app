import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "../components/Providers";
import "./globals.css";

export const metadata = {
  title: "Doctor Appointment System",
  description: "Find trusted specialists and manage your healthcare journey.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
