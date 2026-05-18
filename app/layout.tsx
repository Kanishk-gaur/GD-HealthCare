'use client'

import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

// This sub-component safely accesses the LanguageContext to inject lang and dir dynamically
function LayoutContent({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();
  
  // Set text direction to Right-to-Left (rtl) for Arabic, and Left-to-Right (ltr) for everything else
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={language} dir={dir} className="bg-background">
      <body className="font-sans antialiased flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
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