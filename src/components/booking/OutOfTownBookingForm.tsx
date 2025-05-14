"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getFunctions, httpsCallable } from "firebase/functions"
import { clientApp } from "@/lib/firebase";

const functions = getFunctions(clientApp);
const sendOutOfTownRequestEmail = httpsCallable(functions, 'sendOutOfTownRequestEmail');
// import { logFirestoreError } from "@/utils/logger";

export default function OutOfTownBookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    date: "",
    details: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await sendOutOfTownRequestEmail(formData);
      toast.success("Request submitted! I'll be in touch soon.");
      setFormData({
        name: "",
        email: "",
        location: "",
        date: "",
        details: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-center">Custom or Out of Town Booking Request</h1>
      <p className="text-muted-foreground text-center">
        For sessions outside of Toronto, or for custom packages, please fill out the form below and I’ll get back to you shortly.
      </p>

      <Input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
      <Input name="email" placeholder="Email Address" type="email" value={formData.email} onChange={handleChange} required />
      <Input name="location" placeholder="Session Location (City & Province)" value={formData.location} onChange={handleChange} required />
      <Input name="date" placeholder="Preferred Date" type="date" value={formData.date} onChange={handleChange} required />
      <Textarea
        name="details"
        placeholder="Tell me about the shoot — occasion, style, hours needed, etc."
        rows={4}
        value={formData.details}
        onChange={handleChange}
      />

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Sending..." : "Submit Request"}
      </Button>
    </form>
  );
}
