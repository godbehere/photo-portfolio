import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';

type CreateBookingData = {
    sessionTypeId: string;
    availabilityWindowId: string;
    startTime: string;
    duration: number;
    name: string;
    email: string;
    notes?: string;
}

type AvailabilityWindow = {
    id?: string;
    date: string; // ISO date string, e.g., "2025-05-01"
    startTime: Timestamp; // e.g., "09:00"
    endTime: Timestamp;   // e.g., "12:00"
  };


export const getAllBookings = functions.https.onCall(async () => {
  const bookingRef = admin.firestore().collection('bookings').doc();
  return bookingRef;
});

export const createBooking = functions.https.onCall<CreateBookingData>(async (req) => {
  try {
    const availabilityRef = admin.firestore().collection('availability');
    const availabilitySnapshot = await admin.firestore().collection('availability').doc(req.data.availabilityWindowId).get();

    if(!availabilitySnapshot.exists) return functions.logger.error("Availability doesn't exist");

    const availability = availabilitySnapshot.data() as AvailabilityWindow;
    
    const start = availability.startTime.toDate();
    const end = availability.endTime.toDate();
    const bookingStartDate = new Date(req.data.startTime);
    const bookingEndDate = new Date(bookingStartDate.getTime() + req.data.duration * 60000);
  
    // Save the booking
    const bookingRef = admin.firestore().collection('bookings').doc();
    await bookingRef.set({
        ...req.data,
        startTime: Timestamp.fromDate(bookingStartDate),
        endTime: Timestamp.fromDate(bookingEndDate),
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Trim or split availability
    if (
      bookingStartDate.getTime() === start.getTime() &&
      bookingEndDate.getTime() === end.getTime()
    ) {
      // Full overlap: delete
      await availabilityRef.doc(req.data.availabilityWindowId).delete();
    } else if (bookingStartDate.getTime() === start.getTime()) {
      // Trim start
      await availabilityRef.doc(req.data.availabilityWindowId).update({
        startTime: Timestamp.fromDate(bookingEndDate),
      });
    } else if (bookingEndDate.getTime() === end.getTime()) {
      // Trim end
      await availabilityRef.doc(req.data.availabilityWindowId).update({
        endTime: Timestamp.fromDate(bookingStartDate),
      });
    } else {
      // Split into two
      await Promise.all([
        availabilityRef.doc(req.data.availabilityWindowId).update({
            endTime: Timestamp.fromDate(bookingStartDate),
        }),
        availabilityRef.doc().create({
            date: availability.date,
            startTime: Timestamp.fromDate(bookingEndDate),
            endTime: availability.endTime,
        }),
      ]);
    }
    return { success: true };
  } catch (err) {
    functions.logger.error("Booking create failed", err);
    throw new functions.https.HttpsError('internal', 'Failed to create booking');
  }
  });