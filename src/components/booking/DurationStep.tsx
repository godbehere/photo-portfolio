/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getSessionTypeById } from "@/services/sessionTypes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SessionType } from "@/shared/types";

type Props = {
  data: { sessionTypeId: string; duration?: number };
  setData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function DurationStep({ data, setData, onNext, onBack }: Props) {
  const [sessionType, setSessionType] = useState<SessionType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!data.sessionTypeId) return;
      const type = await getSessionTypeById(data.sessionTypeId);
      setSessionType(type);
      setLoading(false);
    };
    load();
  }, [data.sessionTypeId]);

  const handleSelect = (duration: number) => {
    setData((prev: any) => ({ ...prev, duration }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Select Duration</h2>

      {loading || !sessionType ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {sessionType.durations.map((duration) => (
            <button
              key={duration}
              onClick={() => handleSelect(duration)}
              className={cn(
                "p-4 rounded-lg border hover:border-black transition",
                data.duration === duration ? "bg-black text-white" : "bg-white"
              )}
            >
              <h3 className="text-lg font-semibold">{duration > 60 ? `${duration / 60} hours`:`${duration} minutes`}</h3>
              <p>${sessionType.hourlyRate * duration / 60}</p>
            </button>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!data.duration}>
          Next
        </Button>
      </div>
    </div>
  );
}
