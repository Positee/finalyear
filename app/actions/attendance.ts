// app/actions/attendance.ts
"use server"

import { PrismaClient } from "@prisma/client"
import { getCurrentUser } from "./auth"

const prisma = new PrismaClient()

export type OwnAttendanceRecord = {
  id: string
  attendedAt: Date
  accessLog: {
    accessMethod: string
  }
}

export async function getClassroomAttendance() {
  const now = new Date()
  const start = new Date(now)
  start.setHours(8, 0, 0, 0)

  const end = new Date(now)
  end.setHours(17, 0, 0, 0)

  const records = await prisma.attendanceRecord.findMany({
    where: {
      locationType: "classroom",
    },
    include: {
      student: true, // includes matricNo
    },
    orderBy: {
      attendedAt: "desc",
    },
  })

  // Optional: Flatten to just the data you need
  return records.map((record) => ({
    id: record.id,
    attendedAt: record.attendedAt,
    matricNo: record.student.matricNo,
  }))
}

export async function getDormitoryAttendance() {
  const now = new Date()
  const start = new Date(now)
  start.setHours(18, 0, 0, 0) // 6 PM

  const end = new Date(now)
  if (now.getHours() < 5) end.setDate(end.getDate() + 1)
  end.setHours(7, 0, 0, 0) // 5 AM

  const records = await prisma.attendanceRecord.findMany({
    where: {
      locationType: "dormitory",
    },
    include: {
      student: true,
    },
    orderBy: {
      attendedAt: "desc",
    },
  })

  return records.map((r) => ({
    id: r.id,
    matricNo: r.student.matricNo,
    attendedAt: r.attendedAt,
  }))
}





export async function getOwnClassroomAttendance(): Promise<OwnAttendanceRecord[]>{
  const user = await getCurrentUser()
  if (!user) return []

  const records = await prisma.attendanceRecord.findMany({
    where: {
      studentId: user.id,
      locationType: "classroom"
    },
    include: {
      accessLog: {
        select: {
          accessMethod: true
        }
      }
    },
    orderBy: {
      attendedAt: "desc"
    }
  })

  return records
}

export async function getOwnDormitoryAttendance(): Promise<OwnAttendanceRecord[]> {
  const user = await getCurrentUser()
  if (!user) return []

  const records = await prisma.attendanceRecord.findMany({
    where: {
      studentId: user.id,
      locationType: "dormitory"
    },
    include: {
      accessLog: {
        select: {
          accessMethod: true
        }
      }
    },
    orderBy: {
      attendedAt: "desc"
    }
  })
  console.log(user)
  return records
}