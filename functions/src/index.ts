import * as admin from 'firebase-admin';
import { sendConfirmationEmail, sendContactUsEmail, sendOutOfTownRequestEmail } from "./sendEmail";
import { createBooking } from './bookingFunctions';

admin.initializeApp();

process.env.TZ = 'America/Toronto';

module.exports = {
    sendConfirmationEmail,
    createBooking,
    sendContactUsEmail,
    sendOutOfTownRequestEmail
}
