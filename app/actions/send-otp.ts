// app/actions/send-otp.ts
'use server';

import { generateOTP } from '../../lib/utils';
import { saveOTP } from '../../lib/utils';
import { Resend } from 'resend';

//const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOTP(email: string) {
  const otp = generateOTP();
  saveOTP(email, otp);
   console.log(`OTP for ${email}: ${otp}`)

  //await resend.emails.send({
   // from: 'admin@yourdomain.com',
    //to: email,
    //subject: 'Your OTP Code',
    //html: `<p>Your verification code is <strong>${otp}</strong>.</p>`,
  //});

  return { success: true };
}
