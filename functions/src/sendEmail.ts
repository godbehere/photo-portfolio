import * as functions from 'firebase-functions';
import sgMail from '@sendgrid/mail';
import { CreateBookingData } from '@/shared/types';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const sendEmail = functions.https.onCall<CreateBookingData>(async (req) => {

    await sgMail.send({
        to: req.data.email,
        from: 'photography@godbehere.org',
        templateId: 'd-d433e64ade5440649d84f6a60589d7da',
        dynamicTemplateData: {
            name: req.data.name,
            startTime: req.data.startTime,
            date: req.data.startTime.split('T')[0],
            duration: req.data.duration,
        },
    });

    await sgMail.send({
        to: 'godbehere@gmail.com',
        from: 'photography@godbehere.org',
        subject: 'New Booking',
        text: `New booking from ${req.data.name} (${req.data.email}) for ${req.data.startTime} for ${req.data.duration} minutes.`,
        html: `<strong>New booking from ${req.data.name} (${req.data.email}) for ${req.data.startTime} for ${req.data.duration} minutes.</strong>`,
    });

    return { success: true, message: 'Email sent successfully' };
});