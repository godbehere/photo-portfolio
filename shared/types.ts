import { Timestamp } from "firebase/firestore";

export type AvailabilityWindow = {
    id?: string;
    date: string;
    startTime: Timestamp;
    endTime: Timestamp;
}

export type ContactFormData = {
    name: string;
    email: string;
    message: string;
    subject: string;
}

export type OutOfTownRequestData = {
    name: string;
    email: string;
    details: string;
    location: string;
    date: string;
}

export type CreateBookingData = {
    sessionTypeId: string;
    availabilityWindowId: string;
    startTime: string;
    duration: number;
    name: string;
    email: string;
    notes?: string;
}

export type SessionType = {
    id?: string;
    name: string;
    shortDescription: string;
    longDescription?: string;
    includes: string[];
    durations: number[];
    hourlyRate: number;
    isActive?: boolean;
};

export type Booking = {
    id?: string;
    availabilityWindowId: string;
    createdAt: Timestamp;
    startTime: Timestamp;
    endTime: Timestamp;
    date?: string;
    duration: number;
    name: string;
    email: string;
    notes?: string;
};