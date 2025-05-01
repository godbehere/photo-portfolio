"use client";

import { useEffect, useState } from "react";
import {
  getAllAvailability,
  createAvailability,
  deleteAvailability,
} from "@/services/availabilityService";
import { AvailabilityWindow } from "@/types/availability";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Timestamp } from "firebase/firestore";

export default function AvailabilityPage() {
  const [availability, setAvailability] = useState<AvailabilityWindow[]>([]);
  const [newWindow, setNewWindow] = useState({
    date: "",
    startTime: "", // <-- now a string like "09:00"
    endTime: "",   // <-- now a string like "11:00"
  });

  useEffect(() => {
    loadAvailability();
  }, []);

  async function loadAvailability() {
    const data = await getAllAvailability();
    setAvailability(data);
  }

  async function handleAdd() {
    const { date, startTime, endTime } = newWindow;

    if (!date || !startTime || !endTime) {
      toast.error("Please fill in all fields");
      return;
    }

    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);

    await createAvailability({
      date,
      startTime: Timestamp.fromDate(start),
      endTime: Timestamp.fromDate(end),
    });

    setNewWindow({ date: "", startTime: "", endTime: "" });
    loadAvailability();
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this availability?")) {
      await deleteAvailability(id);
      toast.success("Availability Deleted!");
      loadAvailability();
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Availability</h1>

      <div className="space-x-2 mb-4 flex">
        <Input
          type="date"
          value={newWindow.date}
          onChange={e => setNewWindow({ ...newWindow, date: e.target.value })}
        />
        <Input
          type="time"
          value={newWindow.startTime}
          onChange={e => setNewWindow({ ...newWindow, startTime: e.target.value })}
        />
        <Input
          type="time"
          value={newWindow.endTime}
          onChange={e => setNewWindow({ ...newWindow, endTime: e.target.value })}
        />
        <Button onClick={handleAdd}>Add</Button>
      </div>

      <ul className="space-y-2">
        {availability.map((a) => (
          <li key={a.id} className="flex items-center justify-between border p-3 rounded">
            <span>
              {a.date} — {a.startTime.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} to{" "}
              {a.endTime.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
            <Button variant="destructive" onClick={() => handleDelete(a.id!)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
