"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Props = {
  initialData: {
    id: string
    matricNo: string
    attendedAt: Date
  }[]
}

export default function DeanDashboardClient({ initialData }: Props) {
  const [records] = useState(initialData)

  return (
    <main className="p-6">
      <Tabs defaultValue="dormitory" className="space-y-6">
        <TabsList>
          <TabsTrigger value="dormitory">Dormitory Attendance</TabsTrigger>
        </TabsList>

        <TabsContent value="dormitory">
          <Card>
            <CardHeader>
              <CardTitle>Today's Dorm Attendance</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-4">Matric No</th>
                      <th className="text-left p-4">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record) => (
                      <tr key={record.id} className="border-b last:border-0 hover:bg-gray-50">
                        <td className="p-4">{record.matricNo}</td>
                        <td className="p-4">{new Date(record.attendedAt).toLocaleTimeString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {records.length === 0 && (
                  <div className="p-4 text-center text-sm text-gray-500">No attendance recorded yet today.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
