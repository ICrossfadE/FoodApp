import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import { Motion } from "@/components/motion";

export const metadata: Metadata = {
  title: { default: "Food app — смачно бути вдома", template: "%s · Food app" },
  description:
    "Тестові адаптивні макети сервісу доставки їжі. Без реальних замовлень.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk">
      <body>
        <a className="skip-link" href="#main">
          До основного вмісту
        </a>
        <Suspense fallback={children}>
          <Motion>{children}</Motion>
        </Suspense>
      </body>
    </html>
  );
}
