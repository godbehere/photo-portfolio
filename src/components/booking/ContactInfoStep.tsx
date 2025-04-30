/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Props = {
  data: {
    name: string;
    email: string;
    notes?: string;
  };
  setData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function ContactInfoStep({ data, setData, onNext, onBack }: Props) {
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const validate = () => {
    const errs: typeof errors = {};
    if (!data.name.trim()) errs.name = "Name is required";
    if (!data.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(data.email)) errs.email = "Invalid email";
    return errs;
  };

  const handleNext = () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      onNext();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Information</h2>

      <div className="space-y-4 max-w-md">
        <div>
          <Input
            placeholder="Name"
            value={data.name}
            onChange={e => setData((prev: any) => ({ ...prev, name: e.target.value }))}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <Input
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={e => setData((prev: any) => ({ ...prev, email: e.target.value }))}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <Textarea
            placeholder="Notes (optional)"
            value={data.notes || ""}
            onChange={e => setData((prev: any) => ({ ...prev, notes: e.target.value }))}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
}
