"use client";

import { useForm } from "react-hook-form";
import { bookSession } from "@/services/firestore";
import { Session } from "@/services/firestore";
import { useState } from "react";

type BookingFormInputs = {
  name: string;
  email: string;
  notes?: string;
};

type BookingFormProps = {
  selectedSession: Session;
};

export default function BookingForm({ selectedSession }: BookingFormProps) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<BookingFormInputs>();
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");

  const onSubmit = async (data: BookingFormInputs) => {
    try {
      await bookSession({
        sessionId: selectedSession.id!,
        name: data.name,
        email: data.email,
        notes: data.notes || "",
      });
      setFormStatus("success");
      reset();
    } catch (error) {
      console.error(error);
      setFormStatus("error");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Notes (optional)</label>
          <textarea
            {...register("notes")}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white rounded py-2 hover:bg-gray-800 transition"
        >
          {isSubmitting ? "Booking..." : selectedSession ? `Book ${selectedSession.title}` : "Select a session"}
        </button>

        {formStatus === "success" && (
          <p className="text-green-600 mt-2">Booking successful! 🎉</p>
        )}
        {formStatus === "error" && (
          <p className="text-red-600 mt-2">Booking failed. Please try again. 😔</p>
        )}
      </form>
    </div>
  );
}
