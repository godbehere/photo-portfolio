/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getAllSessionTypes } from "@/services/sessionTypes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SessionType } from "@/shared/types";

type Props = {
  data: { sessionTypeId: string };
  setData: (data: any) => void;
  onNext: () => void;
};

export default function SessionTypeStep({ data, setData, onNext }: Props) {
  const [sessionTypes, setSessionTypes] = useState<SessionType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const types = await getAllSessionTypes();
        setSessionTypes(types);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSelect = (id: string | undefined) => {
    setData((prev: any) => ({ ...prev, sessionTypeId: id }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Choose a Session Type</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
          {sessionTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleSelect(type.id)}
              className={cn(
                "p-4 rounded-lg border hover:border-black text-left transition",
                data.sessionTypeId === type.id ? "bg-black text-white" : "dark:bg-gray-900 bg-white text-gray-600 dark:text-gray-300"
              )}
            >
              <h3 className="text-lg font-semibold">{type.name}</h3>
              <p className="text-sm">{type.durations.length === 1 ? `Price: $${(type.hourlyRate * type.durations[0] / 60).toFixed(2)}` : `Starting @ $${(type.hourlyRate * type.durations[0] / 60).toFixed(2)}`}</p>
              {type.durations.length === 1 ? <p className="text-sm">Length: {type.durations[0] / 60} hours</p> : null}
              <p className="text-sm"><em>{type.shortDescription}</em></p>
              <p className="text-sm">{type.longDescription}</p>
              {type.includes ? type.includes.map((include) => (
                <p key={include} className="text-sm">
                  - {include}
                </p>
              )) : null}
            </button>
          ))}
        </div>
      )}

      <div className="mt-6 text-right">
        <Button
          onClick={onNext}
          disabled={!data.sessionTypeId}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
