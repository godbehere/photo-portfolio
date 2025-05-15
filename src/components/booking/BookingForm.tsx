"use client";

import { useEffect, useState } from "react";
import SessionTypeStep from "./SessionTypeStep";
import DurationStep from "./DurationStep";
import AvailabilityStep from "./AvailabilityStep";
import ContactInfoStep from "./ContactInfoStep";
import ConfirmStep from "./ConfirmStep";
import StartTimeStep from "./StartTimeStep";
import Stepper from "./Stepper";
import BookingSummary from "./BookingSummary";
import { CheckCircle } from "lucide-react";
import { createBooking } from "@/services/bookingService";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

export default function BookingForm() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    sessionTypeId: "",
    availabilityWindowId: "",
    duration: 0,
    date: "",
    startTime: "",
    name: "",
    email: "",
    notes: "",
    total: 0,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      sessionTypeId: searchParams.get("sessionType") || "",
    }));
  }, [searchParams]);

  const goNext = () => setStep((s) => s + 1);
  const goBack = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await createBooking(formData);
      toast.success("Booking confirmed!");
      goNext();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-3">
        <Stepper currentStep={step} />
      </div>
      <div className={step < 5 && step > 0 ? `lg:col-span-2 space-y-6` : `lg:col-span-3 space-y-6`}>


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

      {step < 5 && step > 0 && (
        <div className="bg-white shadow rounded-xl p-4 h-fit">
          <BookingSummary data={formData} />
        </div>
      )}
    </div>
  );
}
