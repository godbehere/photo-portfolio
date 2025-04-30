// src/components/SessionTypeForm.tsx
"use client";

import { useState } from "react";
import { SessionType, createSessionType, updateSessionType } from "@/services/sessionTypes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Props {
  onSuccess: () => void;
  initialData?: SessionType;
}

export default function SessionTypeForm({ onSuccess, initialData }: Props) {
  const [name, setName] = useState(initialData?.name ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [durations, setDurations] = useState(initialData?.durations?.join(", ") ?? "");
  const [hourlyRate, setHourlyRate] = useState(initialData?.hourlyRate?.toString() ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const sessionType: Omit<SessionType, "id"> = {
      name,
      description,
      durations: durations.split(",").map(d => parseInt(d.trim(), 10)),
      hourlyRate: parseFloat(hourlyRate),
      isActive: true,
    };

    try {
      if (initialData?.id) {
        await updateSessionType(initialData.id, sessionType);
        toast.success("Session type updated.");
      } else {
        await createSessionType(sessionType);
        toast.success("Session type created.");
      }
      onSuccess();
    } catch (err) {
      toast.error("Error saving session type");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <Label>Description</Label>
        <Input value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <Label>Durations (comma-separated in minutes)</Label>
        <Input value={durations} onChange={(e) => setDurations(e.target.value)} />
      </div>
      <div>
        <Label>Hourly Rate</Label>
        <Input type="number" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} />
      </div>
      <Button onClick={handleSubmit} disabled={isSubmitting}>
        {initialData ? "Update" : "Create"}
      </Button>
    </div>
  );
}
