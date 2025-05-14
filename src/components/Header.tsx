import { Aperture } from "lucide-react";
import Link from "next/link";

export default function Header() {
    return (
        <header className="border-b dark:bg-gray-900 dark:text-white">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold flex items-center space-x-2">
                <Aperture className="w-6 h-6" />
                <span>Lost Light Photography</span>
            </Link>
            <nav className="space-x-4">
                <Link href="/portfolio">Portfolio</Link>
                <Link href="/booking">Book</Link>
                <Link href="/shop">Shop</Link>
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
            </nav>
            </div>
        </header>
    )
}