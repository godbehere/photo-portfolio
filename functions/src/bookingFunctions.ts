import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

interface CreateBookingData {
    sessionTypeId: string;
    availabilityWindowId: string;
    startTime: string;
    duration: number;
    name: string;
    email: string;
    notes?: string;
}

export const createBooking = functions.https.onCall(async (data: CreateBookingData, context) => {
  const { sessionTypeId, userInfo } = data;

  if (!sessionId || !userInfo) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing required data');
  }

  const bookingRef = admin.firestore().collection('bookings').doc();
  await bookingRef.set({
    sessionId,
    userInfo,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return { success: true, bookingId: bookingRef.id };
});
