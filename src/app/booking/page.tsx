import BookingForm from "@/components/booking/BookingForm";
import { CalendarCheck, Mail, Clock } from "lucide-react";

export default function BookingPage() {
  return (
    <div className="py-12 px-4 max-w-3xl mx-auto space-y-10">
      {/* Overview Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Book Your Photography Session</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          I’m based in <strong>Toronto</strong> and offer shoots within the city — 
          For bookings outside of Toronto, please{" "}
          <a
            href="/booking/out-of-town-request"
            className="underline text-primary hover:text-primary/80"
          >
            complete this form
          </a>{" "}
          instead.
        </p>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Select your preferred session type, duration, and availability. Once you request a slot, we’ll reach out to confirm the details via email.
        </p>
      </div>

      {/* Booking Steps Summary (optional visual aid) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="flex flex-col items-center">
          <Clock className="text-primary" size={32} />
          <p className="mt-2 font-medium">Select Session Type</p>
          <p className="text-sm text-muted-foreground">Choose a session and duration.</p>
        </div>
        <div className="flex flex-col items-center">
          <CalendarCheck className="text-primary" size={32} />
          <p className="mt-2 font-medium">Choose Date & Time</p>
          <p className="text-sm text-muted-foreground">Pick a time that works best for you.</p>
        </div>
        <div className="flex flex-col items-center">
          <Mail className="text-primary" size={32} />
          <p className="mt-2 font-medium">Receive Confirmation</p>
          <p className="text-sm text-muted-foreground">We’ll email you to finalize your session.</p>
        </div>
      </div>

      {/* Booking Form */}
      <BookingForm />
    </div>
  );
}
