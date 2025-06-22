"use client"

import { useEffect, useState } from "react"
import { getClassroomAttendance } from "@/app/actions/attendance" // <- Your server action
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type AttendanceRecord = {
  id: string
  attendedAt: Date;
    matricNo: string
  
}

export default function LecturerDashboardClient() {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([])

  useEffect(() => {
    async function fetchAttendance() {
      const records = await getClassroomAttendance()
      setAttendanceRecords(records)
    }
    fetchAttendance()
  }, [])

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Today's Class Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          {attendanceRecords.length === 0 ? (
            <p className="text-gray-500">No attendance recorded for today.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="p-4">Matric No</th>
                    <th className="p-4">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.map((record) => (
                    <tr key={record.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">{record.matricNo}</td>
                      <td className="p-4">
                        {new Date(record.attendedAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
