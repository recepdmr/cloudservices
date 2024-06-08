import type { Metadata } from "next";
import { Providers } from "./providers";
import { fonts } from "./fonts";
import MainLayout from "@/ui/layouts/main";
import React from "react";
import { ServicesProvider } from '@/contexts/services-context';

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

async function getData() {
  const res = await fetch(`${process.env.APP_SERVICE_ENDPOINT}/application/list`, { next: { revalidate: 60 } })

  if (!res.ok) {
    return [];
  }

  return res.json()
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getData()
  return (
    <html lang='tr'>
      <body className={fonts.rubik.className}>
        <Providers>
          <ServicesProvider services={data}>
            <MainLayout>
              {children}
            </MainLayout>
          </ServicesProvider>
        </Providers>
      </body>
    </html>
  );
}
