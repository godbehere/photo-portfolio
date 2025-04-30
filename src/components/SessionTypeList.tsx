// src/components/SessionTypeList.tsx
"use client";

import { useEffect, useState } from "react";
import { getAllSessionTypes, deleteSessionType, SessionType } from "@/services/sessionTypes";
import SessionTypeForm from "./SessionTypeForm";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SessionTypeList() {
  const [sessionTypes, setSessionTypes] = useState<SessionType[]>([]);
  const [editing, setEditing] = useState<SessionType | null>(null);
  const [showForm, setShowForm] = useState(false);

  const loadSessionTypes = async () => {
    const types = await getAllSessionTypes();
    setSessionTypes(types);
  };

  useEffect(() => {
    loadSessionTypes();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteSessionType(id);
      toast.success("Deleted session type");
      await loadSessionTypes();
    } catch (err) {
      toast.error("Error deleting session type");
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {showForm ? (
        <div className="border rounded-xl p-4">
          <SessionTypeForm
            initialData={editing ?? undefined}
            onSuccess={() => {
              loadSessionTypes();
              setShowForm(false);
              setEditing(null);
            }}
          />
        </div>
      ) : (
        <Button onClick={() => setShowForm(true)}>Add New Session Type</Button>
      )}

      <div className="grid gap-4">
        {sessionTypes.map((type) => (
          <div key={type.id} className="border p-4 rounded-lg flex justify-between items-center">
            <div>
              <div className="font-semibold">{type.name}</div>
              <div className="text-sm text-muted-foreground">
                {type.durations.join(", ")} mins @ ${type.hourlyRate}/hr
              </div>
            </div>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => {
                setEditing(type);
                setShowForm(true);
              }}>Edit</Button>
              <Button variant="destructive" onClick={() => type.id && handleDelete(type.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
