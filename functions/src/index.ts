import * as admin from 'firebase-admin';
import { sendEmail } from "./sendEmail";
import { createBooking } from './bookingFunctions';

admin.initializeApp();

module.exports = {
    sendEmail,
    createBooking
}
