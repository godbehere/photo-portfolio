// app/contact/page.tsx

import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-16 space-y-10">
      <h1 className="text-3xl font-bold text-center">Contact Me</h1>
      <p className="text-muted-foreground text-center max-w-md mx-auto">
        Have a question, want to collaborate, or book a session? Reach out and I’ll get back to you as soon as possible.
      </p>

      <ContactForm />

      <div className="text-center text-sm text-muted-foreground pt-8">
        <p>📍 Based in Toronto, available for local shoots.</p>
        <p className="mt-2">
          For inquiries outside the city, please use the{" "}
          <a
            href="/booking/out-of-town-request"
            className="text-blue-600 hover:underline"
          >
            out-of-town booking request
          </a>
          .
        </p>
      </div>
    </main>
  );
}
