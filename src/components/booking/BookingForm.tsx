"use client";

import { useState } from "react";
import SessionTypeStep from "./SessionTypeStep";
import DurationStep from "./DurationStep";
import AvailabilityStep from "./AvailabilityStep";
import ContactInfoStep from "./ContactInfoStep";
import ConfirmStep from "./ConfirmStep";
import { CheckCircle } from "lucide-react";
import { createBooking } from "@/services/bookingService";
import { toast } from "sonner";
import StartTimeStep from "./StartTimeStep";
import { SessionType } from "@/shared/types";

export default function BookingForm() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    sessionTypeId: "",
    availabilityWindowId: "",
    duration: 0,
    date: "",
    startTime: "",
    name: "",
    email: "",
    notes: "",
  });

  const goNext = (sessionType: SessionType | null = null) => {
      if (sessionType && step === 0 && sessionType.durations.length === 1) {
        setStep((s) => s + 2); // skip duration step
      } else {
        setStep((s) => s + 1);
      }
  }
  const goBack = () => setStep((s) => s - 1);


  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await createBooking(formData);
      toast.success("Booking confirmed!");
      goNext(); // move to thank you page
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-xl rounded-xl space-y-6">
      {step === 0 && <SessionTypeStep data={formData} setData={setFormData} onNext={goNext} />}
      {step === 1 && <DurationStep data={formData} setData={setFormData} onNext={goNext} onBack={goBack} />}
      {step === 2 && <AvailabilityStep data={formData} setData={setFormData} onNext={goNext} onBack={goBack} />}
      {step === 3 && <StartTimeStep data={formData} setData={setFormData} onNext={goNext} onBack={goBack} />}
      {step === 4 && <ContactInfoStep data={formData} setData={setFormData} onNext={goNext} onBack={goBack} />}
      {step === 5 && (
        <ConfirmStep
          data={formData}
          onBack={goBack}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      )}
      {step === 6 && (
        <div className="text-center py-12">
          <CheckCircle className="mx-auto text-green-500" size={48} />
          <h2 className="text-2xl font-semibold mt-4">Booking Requested!</h2>
          <p className="mt-2 text-muted-foreground">We&apos;ve sent a confirmation to your email.</p>
        </div>
      )}
    </div>
  );
}
