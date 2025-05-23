import "tailwindcss";
import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from "sonner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ThemeProvider from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'Lost Light Photography',
  description: 'Photography portfolio, booking, and shop by Lost Light Photography.',
  metadataBase: new URL('https://photography.lostlight.ca'),
  openGraph: {
    title: 'Lost Light Photography',
    description: 'Photography portfolio, booking, and shop by Lost Light Photography.',
    url: 'https://photography.lostlight.ca',
    siteName: 'Lost Light Photography',
    images: [
      {
        url: 'https://photography.lostlight.ca/images/landsend.png',
        width: 1200,
        height: 630,
        alt: 'Lost Light Photography',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lost Light Photography',
    description: 'Photography portfolio, booking, and shop by Lost Light Photography.',
    images: ['https://photography.lostlight.ca/images/landsend.png'],
    // site: '@yourTwitterHandle',
    // creator: '@yourTwitterHandle',
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="C8iL7AIlAa7tTuI4JvwHDSl6qnTTKHVcfm6AX8Ih71g" />
      </head>
      <body className="flex flex-col min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          
          {/* Let main expand to fill available space */}
          <main className="flex-grow dark:bg-gray-900 dark:text-white">
            {children}
            <Toaster position="top-right" richColors />
          </main>
          
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

