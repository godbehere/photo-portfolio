import * as admin from 'firebase-admin';
import { sendEmail } from "./sendEmail";
import { createBooking } from './bookingFunctions';

admin.initializeApp();

process.env.TZ = 'America/Toronto';

module.exports = {
    sendEmail,
    createBooking
}
