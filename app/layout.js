import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProvider from "@/Providers/ReduxProvider";
import MainLayout from "@/Components/Layout/MainLayout";
import "sweetalert2/dist/sweetalert2.min.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "QSL - QuickHire",
  description: "QSL - QuickHire - Task for A. Soft. Engineer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProvider>
          <MainLayout>{children}</MainLayout>
        </ClientProvider>
      </body>
    </html>
  );
}
