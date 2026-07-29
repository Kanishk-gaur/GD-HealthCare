'use client'

import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={language} dir={dir} className="bg-background">
      <body className="font-sans antialiased flex flex-col min-h-screen">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <LanguageProvider>
      <LayoutContent>{children}</LayoutContent>
    </LanguageProvider>
  )
}