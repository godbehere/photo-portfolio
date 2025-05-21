import "tailwindcss";
import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from "sonner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ThemeProvider from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'Lost Light Photography',
  description: 'Photography portfolio, booking, and shop',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <Header />
          <main className="dark:bg-gray-900 dark:text-white">
            {children}
            <Toaster position="top-right" richColors />
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
