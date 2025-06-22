import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const { fingerprint, rfid, pin } = await req.json()

    if (!fingerprint || !rfid || !pin) {
      return NextResponse.json({ error: "All biometric data is required" }, { status: 400 })
    }

    // Check if device is in register mode
    const device = await prisma.deviceState.findUnique({
      where: { id: "main-device" }
    })

    if (!device || device.mode !== "register" || !device.studentId) {
      return NextResponse.json({ error: "Device not in register mode" }, { status: 403 })
    }

    const studentId = device.studentId

    // Save fingerprint
    await prisma.fingerprint.upsert({
      where: { studentId },
      update: { templateData: fingerprint, isActive: true },
      create: { studentId, templateData: fingerprint }
    })

    // Save RFID
    await prisma.rfidTag.upsert({
      where: { studentId },
      update: { tagUid: rfid, isActive: true },
      create: { studentId, tagUid: rfid }
    })

    // Save PIN
    await prisma.keypadPin.upsert({
      where: { studentId },
      update: { pinHash: pin, isActive: true },
      create: { studentId, pinHash: pin }
    })

    // Reset device state
    await prisma.deviceState.update({
      where: { id: "main-device" },
      data: { mode: "idle", studentId: null }
    })

    return NextResponse.json({
      success: true,
      registered: {
        fingerprint: true,
        rfid: true,
        pin: true
      }
    })
  } catch (error) {
    console.error("Biometric registration failed:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
