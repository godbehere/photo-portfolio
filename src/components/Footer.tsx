import Link from "next/link";
import { FaInstagram, FaFacebook, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-4 dark:bg-gray-950 dark:text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Logo / Brand */}
        <div>
          <h3 className="text-2xl font-bold mb-2">Largo Photography</h3>
          <p className="text-gray-400 text-sm">
            Capturing life’s beautiful moments.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="/portfolio" className="hover:underline">Portfolio</Link></li>
            <li><Link href="/booking" className="hover:underline">Book a Session</Link></li>
            <li><Link href="/shop" className="hover:underline">Shop</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Connect</h4>
          <div className="flex justify-center md:justify-start space-x-4 text-xl">
            <a href="https://www.instagram.com/lrgophotos/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-gray-300" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100088354189661" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="hover:text-gray-300" />
            </a>
            <a href="mailto:godbehere@gmail.com">
              <FaEnvelope className="hover:text-gray-300" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Largo Photography. All rights reserved.
      </div>
    </footer>
  );
}
