/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getAllAvailability } from "@/services/availabilityService";
import { AvailabilityWindow } from "@/shared/types";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { logInfo } from "@/utils/logger";
import Link from "next/link";

type Props = {
  data: { duration: number; availabilityWindowId?: string };
  setData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function AvailabilityStep({ data, setData, onNext, onBack }: Props) {
  const [windows, setWindows] = useState<AvailabilityWindow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const allWindows = await getAllAvailability();
      const filtered = allWindows.filter(window => {
        const windowDuration =
          (window.endTime.toDate().getTime() - window.startTime.toDate().getTime()) / 1000 / 60; // in minutes
        return windowDuration >= data.duration;
      }).filter((window) => window.startTime.toDate().getTime() > Date.now());
      setWindows(filtered);
      setLoading(false);
    };
    load();
  }, [data.duration]);

  const handleSelect = (id: string) => {
    logInfo("Select Availability", "Test Message");
    setData((prev: any) => ({ ...prev, availabilityWindowId: id }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Select an Available Time Slot</h2>

      {loading ? (
        <p>Loading...</p>
      ) : windows.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center">
          <p>No available windows match the selected duration.</p>
          <p>
            Please select a different package or fill out the custom booking inquiry form{" "}
            <Link className="underline text-primary hover:text-primary/80" href="/booking/out-of-town-request">
              here
            </Link>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {windows
            .sort((a, b) => a.startTime.toDate().getTime() - b.startTime.toDate().getTime())
            .map((window) => (
              <button
                key={window.id}
                onClick={() => handleSelect(window.id!)}
                className={cn(
                  "p-4 rounded-lg border hover:border-black transition text-left",
                  data.availabilityWindowId === window.id ? "bg-black text-white" : "bg-white"
                )}
              >
                <p className="font-medium">
                  {format(window.startTime.toDate(), "EEEE, MMM d")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {format(window.startTime.toDate(), "h:mm a")} -{" "}
                  {format(window.endTime.toDate(), "h:mm a")}
                </p>
              </button>
            ))}
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!data.availabilityWindowId}>
          Next
        </Button>
      </div>
    </div>
  );
}
