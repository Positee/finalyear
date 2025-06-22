import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

export async function GET() {
  try {
    const device = await prisma.deviceState.findUnique({
      where: { id: "main-device" }
    })

    return NextResponse.json({
      mode: device?.mode || "idle",
      studentId: device?.studentId || null,
      updatedAt: device?.updatedAt || null
    })
  } catch (error) {
    console.error("Failed to fetch device state:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
