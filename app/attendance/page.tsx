"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Download, Filter, Search, User, Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function AttendancePage() {
  const [currentTab, setCurrentTab] = useState("overview")

  // Sample data
  const courses = [
    { id: 1, name: "Web Development Bootcamp", students: 45, attendance: 85 },
    { id: 2, name: "Data Science Fundamentals", students: 32, attendance: 78 },
    { id: 3, name: "UX/UI Design Principles", students: 28, attendance: 92 },
    { id: 4, name: "Mobile App Development", students: 36, attendance: 81 },
  ]

  const students = [
    { id: 1, name: "John Doe", email: "john@example.com", attendance: 95, lastAttended: "2024-05-19" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", attendance: 88, lastAttended: "2024-05-20" },
    { id: 3, name: "Robert Johnson", email: "robert@example.com", attendance: 72, lastAttended: "2024-05-18" },
    { id: 4, name: "Emily Davis", email: "emily@example.com", attendance: 100, lastAttended: "2024-05-20" },
    { id: 5, name: "Michael Wilson", email: "michael@example.com", attendance: 65, lastAttended: "2024-05-15" },
  ]

  const recentSessions = [
    { id: 1, course: "Web Development Bootcamp", date: "2024-05-20", time: "09:00 - 11:00", attendance: 42 },
    { id: 2, name: "Data Science Fundamentals", date: "2024-05-19", time: "14:00 - 16:00", attendance: 29 },
    { id: 3, name: "UX/UI Design Principles", date: "2024-05-19", time: "10:00 - 12:00", attendance: 26 },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-white border-r">
        <div className="p-4 border-b">
          <Link href="/" className="font-bold text-xl text-[#1c1d1f]">
            LearnHub
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Button variant="ghost" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <User className="mr-2 h-4 w-4" />
            Students
          </Button>
          <Button variant="secondary" className="w-full justify-start bg-gray-100">
            <Calendar className="mr-2 h-4 w-4" />
            Attendance
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Clock className="mr-2 h-4 w-4" />
            Schedule
          </Button>
        </nav>
        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#a435f0] flex items-center justify-center text-white">ID</div>
            <div>
              <div className="font-medium">Instructor Name</div>
              <div className="text-xs text-gray-500">instructor@example.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-bold">Attendance Management</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input type="search" placeholder="Search..." className="pl-8 w-64" />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6">
          <Tabs defaultValue="overview" className="space-y-6" onValueChange={setCurrentTab}>
            <TabsList>
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
                    <div className="text-3xl font-bold">141</div>
                    <p className="text-xs text-green-600 mt-1">+12% from last month</p>
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
                    <div className="text-3xl font-bold">4</div>
                    <p className="text-xs text-gray-500 mt-1">No change from last month</p>
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
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {session.attendance} attended
                          </Badge>
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
                            <div
                              className="bg-[#a435f0] h-2 rounded-full"
                              style={{ width: `${course.attendance}%` }}
                            ></div>
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
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4">Course Name</th>
                          <th className="text-left p-4">Students</th>
                          <th className="text-left p-4">Avg. Attendance</th>
                          <th className="text-left p-4">Status</th>
                          <th className="text-left p-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses.map((course) => (
                          <tr key={course.id} className="border-b last:border-0 hover:bg-gray-50">
                            <td className="p-4 font-medium">{course.name}</td>
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
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Active
                              </Badge>
                            </td>
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

            <TabsContent value="students" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Student Attendance</h2>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Students</SelectItem>
                      <SelectItem value="high">High Attendance</SelectItem>
                      <SelectItem value="medium">Medium Attendance</SelectItem>
                      <SelectItem value="low">Low Attendance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4">Student Name</th>
                          <th className="text-left p-4">Email</th>
                          <th className="text-left p-4">Attendance Rate</th>
                          <th className="text-left p-4">Last Attended</th>
                          <th className="text-left p-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((student) => (
                          <tr key={student.id} className="border-b last:border-0 hover:bg-gray-50">
                            <td className="p-4 font-medium">{student.name}</td>
                            <td className="p-4">{student.email}</td>
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
                          <div className="font-medium">Web Development Bootcamp</div>
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
                          <div className="font-medium">Data Science Fundamentals</div>
                          <div className="text-sm text-gray-500">May 22, 2024 • 14:00 - 16:00</div>
                          <div className="text-sm mt-2">Topic: Introduction to Machine Learning</div>
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
      </div>
    </div>
  )
}
