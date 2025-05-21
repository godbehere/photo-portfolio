/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getAvailabilityById } from "@/services/availabilityService";
import { Button } from "@/components/ui/button";
import { format, addMinutes, isBefore } from "date-fns";
import { AvailabilityWindow } from "@/shared/types";
import { cn } from "@/lib/utils";

type Props = {
  data: {
    availabilityWindowId: string;
    duration: number;
    startTime?: string;
  };
  setData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function StartTimeStep({ data, setData, onNext, onBack }: Props) {
  const [, setAvailability] = useState<AvailabilityWindow | null>(null);
  const [options, setOptions] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const avail = await getAvailabilityById(data.availabilityWindowId);
      const start = avail.startTime.toDate();
      const end = avail.endTime.toDate();

      const times: Date[] = [];
      let slot = start;
      while (isBefore(addMinutes(slot, data.duration), end) || addMinutes(slot, data.duration).getTime() === end.getTime()) {
        times.push(slot);
        slot = addMinutes(slot, 30);
      }

      setAvailability(avail);
      setOptions(times);
      setLoading(false);
    };
    load();
  }, [data.availabilityWindowId, data.duration]);

  const handleSelect = (time: Date) => {
    setData((prev: any) => ({ ...prev, startTime: time.toISOString() }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Pick a Start Time</h2>

      {loading ? (
        <p>Loading...</p>
      ) : options.length === 0 ? (
        <p>No start times available for this window.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {options.map((option) => (
            <button
              key={option.toISOString()}
              onClick={() => handleSelect(option)}
              className={cn(
                "p-3 rounded-md border hover:border-black transition",
                data.startTime === option.toISOString()
                  ? "bg-black text-white"
                  : "bg-white dark:bg-gray-900 dark:text-white"
              )}
            >
              {format(option, "h:mm a")}
            </button>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!data.startTime}>
          Next
        </Button>
      </div>
    </div>
  );
}
