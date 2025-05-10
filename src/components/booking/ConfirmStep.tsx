"use client";

import { useState, useEffect } from "react";
import { getAvailabilityById } from "@/services/availabilityService";
import { getSessionTypeById } from "@/services/sessionTypes";
import { AvailabilityWindow } from "@/shared/types";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { SessionType } from "@/shared/types";

type Props = {
  data: {
    sessionTypeId: string;
    duration: number;
    availabilityWindowId: string;
    startTime: string;
    name: string;
    email: string;
    notes?: string;
  };
  onBack: () => void;
  onSubmit: () => void;
  submitting: boolean;
};

export default function ConfirmStep({ data, onBack, onSubmit, submitting }: Props) {
  const [availability, setAvailability] = useState<AvailabilityWindow | null>(null);
  const [sessionType, setSessionType] = useState<SessionType | null>(null);

  useEffect(() => {
    const load = async () => {
      const [avail, session] = await Promise.all([
        getAvailabilityById(data.availabilityWindowId),
        getSessionTypeById(data.sessionTypeId),
      ]);
      setAvailability(avail);
      setSessionType(session);
    };
    load();
  }, [data.availabilityWindowId, data.sessionTypeId]);

  if (!availability || !sessionType) return <p>Loading summary...</p>;

  const start = new Date(data.startTime);
  const end = new Date(start.getTime() + data.duration * 60000); // Add duration in minutes

  const price = (data.duration / 60) * sessionType.hourlyRate;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Confirm Your Request</h2>

      <div className="space-y-2 max-w-md mb-6">
        <div>
          <strong>Session:</strong> {sessionType.name} ({data.duration} minutes)
        </div>
        <div>
          <strong>Date:</strong> {format(start, "EEEE, MMM d")}
        </div>
        <div>
          <strong>Time:</strong> {format(start, "h:mm a")} - {format(end, "h:mm a")}
        </div>
        <div>
          <strong>Price:</strong> ${price.toFixed(2)}
        </div>
        <div>
          <strong>Name:</strong> {data.name}
        </div>
        <div>
          <strong>Email:</strong> {data.email}
        </div>
        {data.notes && (
          <div>
            <strong>Notes:</strong> {data.notes}
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onSubmit} disabled={submitting}>
          {submitting ? "Submitting..." : "Confirm Booking"}
        </Button>
      </div>
    </div>
  );
}
