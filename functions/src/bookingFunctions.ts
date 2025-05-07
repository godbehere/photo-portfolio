import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';
import { CreateBookingData, AvailabilityWindow } from '@/shared/types'
// import sgMail from '@sendgrid/mail';

// Set SendGrid API Key
// sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const getAllBookings = functions.https.onCall(async () => {
  const bookingRef = admin.firestore().collection('bookings').doc();
  return bookingRef;
});

export const createBooking = functions.https.onCall<CreateBookingData>(async (req) => {
  functions.logger.info('Creating booking', req.data);
  try {
    const availabilityRef = admin.firestore().collection('availability');
    const availabilitySnapshot = await admin.firestore().collection('availability').doc(req.data.availabilityWindowId).get();

    if (!availabilitySnapshot.exists) {
      functions.logger.error("Availability doesn't exist");
      return { success: false, message: "Availability doesn't exist" };
    }

    const availability = availabilitySnapshot.data() as AvailabilityWindow;

    const start = availability.startTime.toDate();
    const end = availability.endTime.toDate();
    const bookingStartDate = new Date(req.data.startTime);
    const bookingEndDate = new Date(bookingStartDate.getTime() + req.data.duration * 60000);

    // Save the booking
    const bookingRef = admin.firestore().collection('bookings').doc();
    await bookingRef.set({
      ...req.data,
      createdAt: Timestamp.now(),
      startTime: bookingStartDate,
      endTime: bookingEndDate,
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

    // Send confirmation email
    // const msg = {
    //   to: req.data.email, // Customer's email
    //   from: 'photography@godbehere.org', // Verified sender email      
    //   subject: 'Booking Confirmation',
    //   text: `Your booking has been confirmed from ${bookingStartDate} to ${bookingEndDate}.`,
    //   html: `<p>Your booking has been confirmed from <strong>${bookingStartDate}</strong> to <strong>${bookingEndDate}</strong>.</p>`,
    // };

    // try {
    //   await sgMail.send(msg);
    //   functions.logger.info('Email sent successfully');
    // } catch (emailError) {
    //   functions.logger.error('Failed to send email', emailError);
    //   // return { success: false, message: 'Booking created, but email failed to send' };
    // }

    return { success: true, message: 'Booking created and email sent successfully' };
  } catch (error) {
    functions.logger.error('Error creating booking', error);
    return { success: false, message: 'Error creating booking' };
  }
});
