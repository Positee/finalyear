import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const { rfid, pin, locationId, fingerprint_detected } = await req.json()
  const now = new Date()
  const hour = now.getHours()

  const isClassTime = hour >= 8 && hour < 17
  const isDormTime = hour >= 18 || hour < 7
  const attendanceType = isClassTime ? "classroom" : isDormTime ? "dormitory" : "invalid"

  if (attendanceType === "invalid") {
    return NextResponse.json({ error: "Outside attendance window" }, { status: 400 })
  }

  if (!fingerprint_detected) {
    return NextResponse.json({ error: "Fingerprint not detected" }, { status: 401 })
  }

  // Require both RFID and PIN
  if (!rfid || !pin) {
    return NextResponse.json({ error: "Incomplete credentials: RFID and PIN required" }, { status: 422 })
  }

  const rfidTag = await prisma.rfidTag.findFirst({
    where: { tagUid: rfid, isActive: true },
    include: {
      student: {
        include: {
          user: true
        }
      },
    }
  })

  const pinMatch = await prisma.keypadPin.findFirst({
    where: { pinHash: pin, isActive: true },
    include: {
      student: true
    }
  })

  // Ensure both match and belong to the same student
  if (!rfidTag || !pinMatch || rfidTag.studentId !== pinMatch.studentId) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 403 })
  }

  const student = rfidTag.student

  const accessLog = await prisma.accessLog.create({
    data: {
      userId: student.user.id,
      accessType: "entry",
      accessMethod: "3fa",
      accessResult: "success"
    }
  })

  const attendance = await prisma.attendanceRecord.create({
    data: {
      studentId: student.id,
      locationId: String(locationId),
      locationType: attendanceType,
      accessLogId: accessLog.id,
      attendedAt: now
    }
  })

  return NextResponse.json({
    success: true,
    attendanceType,
    time: attendance.attendedAt,
    student: {
      name: student.matricNo,
      email: student.email
    }
  })
}
