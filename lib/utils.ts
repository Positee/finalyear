import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// lib/otp.ts
export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
}
// lib/otp-store.ts

type OTPEntry = {
  code: string;
  createdAt: number;
};

const otpStore = new Map<string, OTPEntry>();

export function saveOTP(email: string, code: string) {
  otpStore.set(email, { code, createdAt: Date.now() });
}

export function getOTP(email: string): OTPEntry | undefined {
  return otpStore.get(email);
}

export function deleteOTP(email: string) {
  otpStore.delete(email);
}
