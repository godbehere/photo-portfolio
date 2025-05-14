import * as functions from 'firebase-functions';
import sgMail from '@sendgrid/mail';
import { ContactFormData, CreateBookingData, OutOfTownRequestData } from '@/shared/types';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const sendContactUsEmail = functions.https.onCall<ContactFormData>(async (req) => {

    await sgMail.send({
        to: process.env.LARGO_EMAIL,
        from: 'photography@godbehere.org',
        templateId: process.env.CONTACT_EMAIL_TEMPLATE!,
        dynamicTemplateData: {
            name: req.data.name,
            email: req.data.email,
            message: req.data.message,
            subject: req.data.subject,
        }
    });

    return { success: true, message: 'Email sent successfully' };
});

export const sendOutOfTownRequestEmail = functions.https.onCall<OutOfTownRequestData>(async (req) => {

    await sgMail.send({
        to: process.env.LARGO_EMAIL,
        from: 'photography@godbehere.org',
        templateId: process.env.OOT_EMAIL_TEMPLATE!,
        dynamicTemplateData: {
            name: req.data.name,
            email: req.data.email,
            message: req.data.details,
            location: req.data.location,
            date: req.data.date,
        }
    });

    return { success: true, message: 'Email sent successfully' };
});

export const sendConfirmationEmail = functions.https.onCall<CreateBookingData>(async (req) => {

    const startTime = new Date(req.data.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const date = new Date(req.data.startTime).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

    await sgMail.send({
        to: req.data.email,
        from: 'photography@godbehere.org',
        templateId: process.env.BOOKING_CONFIRMATION_EMAIL_TEMPLATE!,
        dynamicTemplateData: {
            name: req.data.name,
            startTime: startTime,
            date: date,
            duration: req.data.duration,
        },
    });

    await sgMail.send({
        to: process.env.LARGO_EMAIL,
        from: 'photography@godbehere.org',
        subject: 'New Booking',
        text: `New booking from ${req.data.name} (${req.data.email}) on ${date} at ${startTime} for ${req.data.duration} minutes.\nNotes: ${req.data.notes}`,
        html: `<p><strong>New booking from ${req.data.name} (${req.data.email}) on ${date} at ${startTime} for ${req.data.duration} minutes.</strong></p><p>Notes: ${req.data.notes}</p>`,
    });

    return { success: true, message: 'Email sent successfully' };
});