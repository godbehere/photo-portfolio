"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSession } from "@/services/firestore";
import { useRouter } from "next/navigation";
import { Timestamp } from "firebase/firestore";

const sessionSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  sessionType: z.string().min(1, "Session type is required"),
  price: z.coerce.number().min(0, "Price must be at least 0"),
});

type SessionFormData = z.infer<typeof sessionSchema>;

export default function AdminSessionForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SessionFormData>({
    resolver: zodResolver(sessionSchema),
  });

  const onSubmit = async (data: SessionFormData) => {
    const session = {
      ...data,
      date: Timestamp.fromDate(new Date(data.date)),
      isBooked: false,
    };

    await createSession(session);
    router.push("/admin/sessions");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto">
      <div>
        <label className="block font-medium mb-1">Title</label>
        <input
          type="text"
          {...register("title")}
          className="w-full border rounded px-3 py-2"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block font-medium mb-1">Description</label>
        <textarea
          {...register("description")}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Date</label>
          <input
            type="date"
            {...register("date")}
            className="w-full border rounded px-3 py-2"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Time</label>
          <input
            type="time"
            {...register("time")}
            className="w-full border rounded px-3 py-2"
          />
          {errors.time && <p className="text-red-500 text-sm">{errors.time.message}</p>}
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Session Type</label>
        <input
          type="text"
          {...register("sessionType")}
          className="w-full border rounded px-3 py-2"
        />
        {errors.sessionType && (
          <p className="text-red-500 text-sm">{errors.sessionType.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Price ($)</label>
        <input
          type="number"
          step="0.01"
          {...register("price")}
          className="w-full border rounded px-3 py-2"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary text-black px-6 py-2 rounded hover:bg-primary/80 disabled:opacity-50"
      >
        {isSubmitting ? "Creating..." : "Create Session"}
      </button>
    </form>
  );
}
