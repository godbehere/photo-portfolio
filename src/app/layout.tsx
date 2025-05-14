import "tailwindcss";
import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from "sonner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
// import ThemeProvider from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'Lost Light Photography',
  description: 'Photography portfolio, booking, and shop',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {/* <ThemeProvider > */}
          <main>
            {children}
            <Toaster position="top-right" richColors />
          </main>
        {/* </ThemeProvider> */}
        <Footer />
      </body>
    </html>
  )
}
