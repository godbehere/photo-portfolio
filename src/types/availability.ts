import { Timestamp } from "firebase/firestore";

// src/types/availability.ts
export type AvailabilityWindow = {
    id?: string;
    date: string; // ISO date string, e.g., "2025-05-01"
    startTime: Timestamp; // e.g., "09:00"
    endTime: Timestamp;   // e.g., "12:00"
  };
  