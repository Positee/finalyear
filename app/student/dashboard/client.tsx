"use client"
import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { getOwnClassroomAttendance, getOwnDormitoryAttendance } from "@/app/actions/attendance"

export type AttendanceRecordWithAccessLog = {
  id: string
  attendedAt: Date
  accessLog: {
    accessMethod: string
  }
}


export default function StudentDashboardClient({ user }: { user: any }) {
  const [classroomAttendance, setClassroomAttendance] = useState<AttendanceRecordWithAccessLog[]>([])
  const [dormitoryAttendance, setDormitoryAttendance] = useState<AttendanceRecordWithAccessLog[]>([])

  useEffect(() => {
    async function fetchAttendance() {
      const [classRes, dormRes] = await Promise.all([
        getOwnClassroomAttendance(),
        getOwnDormitoryAttendance(),
      ])
      setClassroomAttendance(classRes || [])
      setDormitoryAttendance(dormRes || [])
    }
    fetchAttendance()
  }, [])

  console.log(dormitoryAttendance)

  return (
    <main className="p-6">
      <Tabs defaultValue="classroom" className="space-y-6">
        <TabsList>
          <TabsTrigger value="classroom">Classroom Attendance</TabsTrigger>
          <TabsTrigger value="dormitory">Dormitory Attendance</TabsTrigger>
        </TabsList>

        <TabsContent value="classroom">
          <Card>
            <CardHeader>
              <CardTitle>Your Classroom Attendance</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Date</th>
                      <th className="text-left p-4">Time</th>
                      <th className="text-left p-4">Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classroomAttendance.map((record: any) => (
                      <tr key={record.id} className="border-b last:border-0 hover:bg-gray-50">
                        <td className="p-4">{new Date(record.attendedAt).toLocaleDateString()}</td>
                        <td className="p-4">{new Date(record.attendedAt).toLocaleTimeString()}</td>
                        <td className="p-4">{record.accessLog.accessMethod}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dormitory">
          <Card>
            <CardHeader>
              <CardTitle>Your Dormitory Attendance</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Date</th>
                      <th className="text-left p-4">Time</th>
                      <th className="text-left p-4">Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dormitoryAttendance.map((record: any) => (
                      <tr key={record.id} className="border-b last:border-0 hover:bg-gray-50">
                        <td className="p-4">{new Date(record.attendedAt).toLocaleDateString()}</td>
                        <td className="p-4">{new Date(record.attendedAt).toLocaleTimeString()}</td>
                        <td className="p-4">{record.accessLog.accessMethod}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
