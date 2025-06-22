// app/actions/verify-otp.ts
'use server';

import { getOTP, deleteOTP } from '../../lib/utils';

export async function verifyOTP(email: string, code: string) {
  const record = getOTP(email);
  if (!record) {
    return { success: false, message: 'OTP not found' };
  }

  const isExpired = Date.now() - record.createdAt > 10 * 60 * 1000;
  if (isExpired) {
    deleteOTP(email);
    return { success: false, message: 'OTP expired' };
  }

  if (record.code !== code) {
    return { success: false, message: 'Incorrect OTP' };
  }

  deleteOTP(email);

  // You could now save the "admin" in memory too or use JSON files for now

  return { success: true };
}
