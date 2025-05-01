"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getSessionById, updateSession, Session } from "@/services/firestore";
import { Timestamp } from "firebase/firestore";
import { format } from "date-fns";

export default function EditSessionPage({ params }: { params: { id: string } }) {
  const [session, setSession] = useState<Session | null>(null);
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    sessionType: "",
    price: "",
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchSession() {
      const data = await getSessionById(params.id);
      if (data) {
        setSession(data);
        setFormState({
          title: data.title,
          description: data.description || "",
          date: format(data.date.toDate(), "yyyy-MM-dd"),
          time: data.time,
          sessionType: data.sessionType,
          price: data.price.toString(),
        });
      }
      setLoading(false);
    }
    fetchSession();
  }, [params.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!session) return;

    const updated: Session = {
      ...session,
      title: formState.title,
      description: formState.description,
      date: Timestamp.fromDate(new Date(formState.date)),
      time: formState.time,
      sessionType: formState.sessionType,
      price: parseFloat(formState.price),
    };

    await updateSession(session.id!, updated);

    toast.success("Session successfully updated");

    router.push("/admin/sessions");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  }

  if (loading) return <p className="p-6">Loading...</p>;
  if (!session) return <p className="p-6 text-red-600">Session not found.</p>;

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Edit Session</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formState.title}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formState.description}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="date"
          name="date"
          value={formState.date}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="time"
          name="time"
          value={formState.time}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <select
          name="sessionType"
          value={formState.sessionType}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        >
          <option value="">Select Type</option>
          <option value="portrait">Portrait</option>
          <option value="wedding">Wedding</option>
          <option value="event">Event</option>
        </select>
        <input
          type="number"
          name="price"
          value={formState.price}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Save Changes
        </button>
      </form>
    </main>
  );
}
