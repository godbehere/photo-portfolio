import { ContactForm } from "@/components/ContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Contact | Lost Light Photography',
  description: 'Get in touch with Lost Light Photography for inquiries and bookings.',
  openGraph: {
    title: 'Contact | Lost Light Photography',
    description: 'Get in touch with Lost Light Photography for inquiries and bookings.',
    url: 'https://photography.lostlight.ca/contact',
    images: ['https://photography.lostlight.ca/images/mushroom.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Lost Light Photography',
    description: 'Get in touch with Lost Light Photography for inquiries and bookings.',
    images: ['https://photography.lostlight.ca/images/mushroom.jpg'],
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 space-y-10">
      <h1 className="text-3xl font-bold text-center">Contact Me</h1>
      <p className="text-muted-foreground text-center max-w-md mx-auto">
        Have a question, want to collaborate, or book a custom session? Reach out and I’ll get back to you as soon as possible.
      </p>

      <ContactForm />

      <div className="text-center text-sm text-muted-foreground pt-8">
        <p>📍 Based in Toronto, available for local shoots.</p>
        <p className="mt-2">
          For inquiries outside the city, please use the{" "}
          <a
            href="/booking/custom-request"
            className="text-blue-600 hover:underline"
          >
            custom booking request
          </a>
          .
        </p>
      </div>
    </div>
  );
}
