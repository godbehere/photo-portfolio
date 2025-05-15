import { motion } from "framer-motion";

const steps = [
  "Session Type",
  "Duration",
  "Date",
  "Start Time",
  "Contact Info",
  "Confirm",
];

export default function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-between gap-2 overflow-x-auto text-sm mb-4">
      {steps.map((label, i) => (
        <div key={label} className="flex-1 flex flex-col items-center">
          <motion.div
            className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-xs z-10 ${
              i <= currentStep ? "bg-blue-600" : "bg-gray-300"
            }`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {i + 1}
          </motion.div>
          <span className="mt-1 text-center text-gray-700">{label}</span>
        </div>
      ))}
    </div>
  );
}
