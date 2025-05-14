"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { clientApp } from "@/lib/firebase";
import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions(clientApp);
const sendContactEmail = httpsCallable(functions, 'sendContactUsEmail');

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
        await sendContactEmail(formData);
        toast.success("Message sent!");
        setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
        console.error(err);
        toast.error("Something went wrong.");
    } finally {
        setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="name"
        placeholder="Your name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <Input
        name="email"
        type="email"
        placeholder="Your email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Input
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
        required
      />
      <Textarea
        name="message"
        placeholder="Your message"
        value={formData.message}
        onChange={handleChange}
        rows={5}
        required
      />
      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
