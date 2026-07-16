import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AppProviders from "@/shared/ui/AppProviders/AppProviders";
import AppLayout from "@/shared/ui/AppLayout/AppLayout";
import FloatingGitHub from "@/shared/ui/FloatingGitHub/FloatingGitHub";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "JSON Lab",
    template: "%s | JSON Lab",
  },
  description: "Modern JSON toolkit for developers.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <AntdRegistry>
          <AppProviders>
            <AppLayout>
              {children}
            </AppLayout>

            <FloatingGitHub />
          </AppProviders>
        </AntdRegistry>
      </body>
    </html>
  );
}
