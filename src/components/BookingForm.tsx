"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// interface BookingFormData {
//   name: string;
//   email: string;
//   sessionType: string;
//   date: Date;
//   notes?: string;
// }


export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    sessionType: "",
    date: new Date(),
    time: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const sessionOptions = [
    { label: "30-min Portrait Session – $150", value: "Portrait" },
    { label: "1-hour Event Session – $250", value: "Event" },
    { label: "2-hour Wedding Shoot – $500", value: "Wedding" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSessionSelect = (value: string) => {
    setFormData({ ...formData, sessionType: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    setSubmitted(true);
    // 🔥 Next step: Save to Firestore
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Book a Session</h2>

      {submitted ? (
        <div className="text-green-600 text-center text-lg font-semibold">
          🎉 Thank you! We&apos;ll be in touch soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={formData.name}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>

          {/* Session Type (cards) */}
          <div>
            <label className="block mb-2 font-medium">Select a Session</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sessionOptions.map((option) => (
                <div
                  key={option.value}
                  className={`cursor-pointer border rounded-md p-4 text-center ${
                    formData.sessionType === option.label
                      ? "border-blue-600 bg-blue-100"
                      : "border-gray-300"
                  } hover:border-blue-400 transition`}
                  onClick={() => handleSessionSelect(option.label)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block mb-1 font-medium">Date</label>
            <DatePicker
              selected={formData.date}
              onChange={(date: Date | null) => {
                    if (date) {
                        setFormData({ ...formData, date });
                    }
                }
                }
              className="w-full border border-gray-300 p-2 rounded-md"
              minDate={new Date()}
              required
            />
          </div>

          {/* Time */}
          <div>
            <label className="block mb-1 font-medium">Time</label>
            <input
              type="time"
              name="time"
              onChange={handleChange}
              value={formData.time}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block mb-1 font-medium">Notes (Optional)</label>
            <textarea
              name="notes"
              onChange={handleChange}
              value={formData.notes}
              rows={4}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit Booking
          </button>
        </form>
      )}
    </div>
  );
}
