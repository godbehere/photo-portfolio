import "tailwindcss";
import './globals.css'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: 'My Photography',
  description: 'Photography portfolio, booking, and shop',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">📸 MyPhoto</Link>
            <nav className="space-x-4">
              <Link href="/portfolio">Portfolio</Link>
              <Link href="/booking">Book</Link>
              <Link href="/shop">Shop</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>
        </header>
        <main>
          {children}
          <Toaster position="top-right" richColors />
        </main>
        {/* <footer className="bg-gray-100 py-6 mt-12">
          <div className="container mx-auto px-4 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} MyPhoto — All rights reserved.
          </div>
        </footer> */}
      </body>
    </html>
  )
}
