"use client"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"
import {  Download } from "lucide-react"
import {Badge} from "./ui/badge"
import { Input } from "./ui/input"





export function LecturerDashboard() {
  const [currentTab, setCurrentTab] = useState("overview")

  // Sample data
  const courses = [
    { id: 1, name: "Web Development", code: "CS101", students: 45, attendance: 85 },
    { id: 2, name: "Data Structures", code: "CS201", students: 32, attendance: 78 },
    { id: 3, name: "Database Systems", code: "CS301", students: 28, attendance: 92 },
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

  const recentSessions = [
    { id: 1, course: "Web Development", date: "2024-05-20", time: "09:00 - 11:00", attendance: 42 },
    { id: 2, course: "Data Structures", date: "2024-05-19", time: "14:00 - 16:00", attendance: 29 },
    { id: 3, course: "Database Systems", date: "2024-05-19", time: "10:00 - 12:00", attendance: 26 },
  ]

  return (
    <main className="p-6">
      <Tabs defaultValue="overview" className="space-y-6" onValueChange={setCurrentTab}>
        <TabsList  className="flex gap-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">105</div>
                <p className="text-xs text-green-600 mt-1">+5 new students this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Average Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">84%</div>
                <p className="text-xs text-green-600 mt-1">+3% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Active Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                      <div>
                        <div className="font-medium">{session.course}</div>
                        <div className="text-sm text-gray-500">
                          {session.date} • {session.time}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {session.attendance} attended
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance by Course</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.map((course) => (
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
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="active">Active Courses</SelectItem>
                  <SelectItem value="completed">Completed Courses</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Download All
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Course Name</th>
                      <th className="text-left p-4">Course Code</th>
                      <th className="text-left p-4">Students</th>
                      <th className="text-left p-4">Avg. Attendance</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr key={course.id} className="border-b last:border-0 hover:bg-gray-50">
                        <td className="p-4 font-medium">{course.name}</td>
                        <td className="p-4">{course.code}</td>
                        <td className="p-4">{course.students}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span>{course.attendance}%</span>
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  course.attendance >= 90
                                    ? "bg-green-500"
                                    : course.attendance >= 75
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                }`}
                                style={{ width: `${course.attendance}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
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

        <TabsContent value="students" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Student Attendance</h2>
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
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Session Management</h2>
            <Button className="bg-[#a435f0] hover:bg-[#8710d8] text-white">Create New Session</Button>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-4">Create Session</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Select Course</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course.id} value={course.id.toString()}>
                              {course.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Session Date</label>
                      <Input type="date" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Start Time</label>
                        <Input type="time" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">End Time</label>
                        <Input type="time" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Session Topic</label>
                      <Input placeholder="Enter session topic" />
                    </div>

                    <Button className="w-full bg-[#a435f0] hover:bg-[#8710d8] text-white">Schedule Session</Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Upcoming Sessions</h3>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="font-medium">Web Development</div>
                      <div className="text-sm text-gray-500">May 21, 2024 • 09:00 - 11:00</div>
                      <div className="text-sm mt-2">Topic: Advanced JavaScript Concepts</div>
                      <div className="flex justify-between items-center mt-4">
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          Upcoming
                        </Badge>
                        <Button variant="outline" size="sm">
                          Take Attendance
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="font-medium">Data Structures</div>
                      <div className="text-sm text-gray-500">May 22, 2024 • 14:00 - 16:00</div>
                      <div className="text-sm mt-2">Topic: Binary Trees</div>
                      <div className="flex justify-between items-center mt-4">
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          Upcoming
                        </Badge>
                        <Button variant="outline" size="sm">
                          Take Attendance
                        </Button>
                      </div>
                    </div>
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