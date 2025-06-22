"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download} from "lucide-react"
import { Button } from "./ui/button"

export function AdminDashboard() {
  const [currentTab, setCurrentTab] = useState("overview")

  // Sample data
  const courses = [
    { id: 1, name: "Web Development", code: "CS101", students: 45, attendance: 85 },
    { id: 2, name: "Data Structures", code: "CS201", students: 32, attendance: 78 },
    { id: 3, name: "Database Systems", code: "CS301", students: 28, attendance: 92 },
    { id: 4, name: "Computer Networks", code: "CS401", students: 36, attendance: 81 },
  ]

  const students = [
    {
      id: 1,
      name: "John Doe",
      studentId: "STU1001",
      course: "Web Development",
      attendance: 95,
      lastAttended: "2024-05-19 09:15:22",
    },
    {
      id: 2,
      name: "Jane Smith",
      studentId: "STU1002",
      course: "Web Development",
      attendance: 88,
      lastAttended: "2024-05-20 09:12:45",
    },
    {
      id: 3,
      name: "Robert Johnson",
      studentId: "STU1003",
      course: "Data Structures",
      attendance: 72,
      lastAttended: "2024-05-18 14:05:33",
    },
    {
      id: 4,
      name: "Emily Davis",
      studentId: "STU1004",
      course: "Database Systems",
      attendance: 100,
      lastAttended: "2024-05-20 11:00:12",
    },
    {
      id: 5,
      name: "Michael Wilson",
      studentId: "STU1005",
      course: "Data Structures",
      attendance: 65,
      lastAttended: "2024-05-15 14:10:55",
    },
  ]

  const dormitories = [
    { id: 1, name: "North Hall", students: 120, attendance: 92 },
    { id: 2, name: "South Hall", students: 95, attendance: 88 },
    { id: 3, name: "East Hall", students: 110, attendance: 95 },
    { id: 4, name: "West Hall", students: 85, attendance: 90 },
  ]

  const dormitoryAttendance = [
    {
      id: 1,
      name: "John Doe",
      studentId: "STU1001",
      dormitory: "North Hall",
      room: "N-101",
      checkIn: "2024-05-20 21:15:22",
      checkOut: "2024-05-21 07:30:15",
    },
    {
      id: 2,
      name: "Jane Smith",
      studentId: "STU1002",
      dormitory: "North Hall",
      room: "N-102",
      checkIn: "2024-05-20 22:05:45",
      checkOut: "2024-05-21 08:10:33",
    },
    {
      id: 3,
      name: "Robert Johnson",
      studentId: "STU1003",
      dormitory: "South Hall",
      room: "S-205",
      checkIn: "2024-05-20 21:45:12",
      checkOut: "2024-05-21 07:15:40",
    },
    {
      id: 4,
      name: "Emily Davis",
      studentId: "STU1004",
      dormitory: "East Hall",
      room: "E-310",
      checkIn: "2024-05-20 22:30:55",
      checkOut: "2024-05-21 06:45:22",
    },
    {
      id: 5,
      name: "Michael Wilson",
      studentId: "STU1005",
      dormitory: "West Hall",
      room: "W-115",
      checkIn: "2024-05-20 23:10:18",
      checkOut: "2024-05-21 07:55:10",
    },
  ]

  return (
    <main className="p-6">
      <Tabs defaultValue="overview" className="space-y-6" onValueChange={setCurrentTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Course Attendance</TabsTrigger>
          <TabsTrigger value="dormitories">Dormitory Attendance</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">410</div>
                <p className="text-xs text-green-600 mt-1">+15 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Course Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">86%</div>
                <p className="text-xs text-green-600 mt-1">+2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Dormitory Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">92%</div>
                <p className="text-xs text-green-600 mt-1">+1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Active Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24</div>
                <p className="text-xs text-gray-500 mt-1">No change from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Attendance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.slice(0, 3).map((course) => (
                    <div key={course.id} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{course.name}</span>
                        <span className="text-sm">{course.attendance}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#a435f0] h-2 rounded-full" style={{ width: `${course.attendance}%` }}></div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full">
                    View All Courses
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dormitory Attendance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dormitories.slice(0, 3).map((dorm) => (
                    <div key={dorm.id} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{dorm.name}</span>
                        <span className="text-sm">{dorm.attendance}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#a435f0] h-2 rounded-full" style={{ width: `${dorm.attendance}%` }}></div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full">
                    View All Dormitories
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Course Attendance</h2>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id.toString()}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Student Name</th>
                      <th className="text-left p-4">Student ID</th>
                      <th className="text-left p-4">Course</th>
                      <th className="text-left p-4">Attendance Rate</th>
                      <th className="text-left p-4">Last Attended</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} className="border-b last:border-0 hover:bg-gray-50">
                        <td className="p-4 font-medium">{student.name}</td>
                        <td className="p-4">{student.studentId}</td>
                        <td className="p-4">{student.course}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span>{student.attendance}%</span>
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  student.attendance >= 90
                                    ? "bg-green-500"
                                    : student.attendance >= 75
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                }`}
                                style={{ width: `${student.attendance}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">{student.lastAttended}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dormitories" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Dormitory Attendance</h2>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by dormitory" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dormitories</SelectItem>
                  {dormitories.map((dorm) => (
                    <SelectItem key={dorm.id} value={dorm.id.toString()}>
                      {dorm.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Student Name</th>
                      <th className="text-left p-4">Student ID</th>
                      <th className="text-left p-4">Dormitory</th>
                      <th className="text-left p-4">Room</th>
                      <th className="text-left p-4">Check In</th>
                      <th className="text-left p-4">Check Out</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dormitoryAttendance.map((record) => (
                      <tr key={record.id} className="border-b last:border-0 hover:bg-gray-50">
                        <td className="p-4 font-medium">{record.name}</td>
                        <td className="p-4">{record.studentId}</td>
                        <td className="p-4">{record.dormitory}</td>
                        <td className="p-4">{record.room}</td>
                        <td className="p-4">{record.checkIn}</td>
                        <td className="p-4">{record.checkOut}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Dormitory Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dormitories.map((dorm) => (
                    <div key={dorm.id} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{dorm.name}</span>
                        <span className="text-sm">{dorm.attendance}% Attendance</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#a435f0] h-2 rounded-full" style={{ width: `${dorm.attendance}%` }}></div>
                      </div>
                      <div className="text-sm text-gray-500">{dorm.students} students</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Check-ins</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dormitoryAttendance.slice(0, 3).map((record) => (
                    <div key={record.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                      <div>
                        <div className="font-medium">{record.name}</div>
                        <div className="text-sm text-gray-500">
                          {record.dormitory} • Room {record.room}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">{record.checkIn.split(" ")[1]}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Generate Reports</h2>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-4">Course Attendance Reports</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Report Type</label>
                      <Select defaultValue="daily">
                        <SelectTrigger>
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily Report</SelectItem>
                          <SelectItem value="weekly">Weekly Report</SelectItem>
                          <SelectItem value="monthly">Monthly Report</SelectItem>
                          <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Select Course</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Courses</SelectItem>
                          {courses.map((course) => (
                            <SelectItem key={course.id} value={course.id.toString()}>
                              {course.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Start Date</label>
                        <Input type="date" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">End Date</label>
                        <Input type="date" />
                      </div>
                    </div>

                    <Button className="w-full bg-[#a435f0] hover:bg-[#8710d8] text-white">
                      <Download className="mr-2 h-4 w-4" />
                      Generate Course Report
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Dormitory Attendance Reports</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Report Type</label>
                      <Select defaultValue="daily">
                        <SelectTrigger>
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily Report</SelectItem>
                          <SelectItem value="weekly">Weekly Report</SelectItem>
                          <SelectItem value="monthly">Monthly Report</SelectItem>
                          <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Select Dormitory</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a dormitory" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Dormitories</SelectItem>
                          {dormitories.map((dorm) => (
                            <SelectItem key={dorm.id} value={dorm.id.toString()}>
                              {dorm.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Start Date</label>
                        <Input type="date" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">End Date</label>
                        <Input type="date" />
                      </div>
                    </div>

                    <Button className="w-full bg-[#a435f0] hover:bg-[#8710d8] text-white">
                      <Download className="mr-2 h-4 w-4" />
                      Generate Dormitory Report
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}