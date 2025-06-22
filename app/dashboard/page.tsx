import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  BookOpen,
  Calendar,
  Clock,
  Download,
  Filter,
  GraduationCap,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react"

export default function DashboardPage() {
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
          <Button variant="secondary" className="w-full justify-start bg-gray-100">
            <BarChart className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <BookOpen className="mr-2 h-4 w-4" />
            My Courses
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Calendar className="mr-2 h-4 w-4" />
            Calendar
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <GraduationCap className="mr-2 h-4 w-4" />
            Grades
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" />
            Students
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Clock className="mr-2 h-4 w-4" />
            Schedule
          </Button>
          <Link href="/attendance">
            <Button variant="ghost" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              Attendance
            </Button>
          </Link>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </nav>
        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#a435f0] flex items-center justify-center text-white">IN</div>
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
            <h1 className="text-xl font-bold">Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="pl-8 pr-4 py-2 border rounded-md text-sm w-64"
                />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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
                <CardTitle className="text-sm font-medium text-gray-500">Active Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">4</div>
                <p className="text-xs text-gray-500 mt-1">No change from last month</p>
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
                <CardTitle className="text-sm font-medium text-gray-500">Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">76%</div>
                <p className="text-xs text-red-600 mt-1">-2% from last month</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Performance</CardTitle>
                    <CardDescription>Average student performance by course</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                      <p className="text-gray-500">Course performance chart would appear here</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Student Engagement</CardTitle>
                    <CardDescription>Weekly student activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                      <p className="text-gray-500">Student engagement chart would appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates from your courses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
                        <div>
                          <p className="font-medium">Student Name {i}</p>
                          <p className="text-sm text-gray-500">
                            {i % 2 === 0
                              ? "Submitted an assignment in Web Development Bootcamp"
                              : "Asked a question in Data Science Fundamentals"}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="courses">
              <Card>
                <CardHeader>
                  <CardTitle>Your Courses</CardTitle>
                  <CardDescription>Manage and monitor your active courses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: "Web Development Bootcamp", students: 45, progress: 65 },
                      { name: "Data Science Fundamentals", students: 32, progress: 48 },
                      { name: "UX/UI Design Principles", students: 28, progress: 72 },
                      { name: "Mobile App Development", students: 36, progress: 35 },
                    ].map((course, i) => (
                      <Card key={i} className="overflow-hidden">
                        <div className="h-3 bg-[#a435f0]"></div>
                        <CardContent className="p-4">
                          <h3 className="font-bold mb-2">{course.name}</h3>
                          <div className="flex justify-between text-sm mb-2">
                            <span>{course.students} students</span>
                            <span>{course.progress}% complete</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                            <div
                              className="bg-[#a435f0] h-2 rounded-full"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-end">
                            <Button variant="outline" size="sm">
                              View Course
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="students">
              <Card>
                <CardHeader>
                  <CardTitle>Student Management</CardTitle>
                  <CardDescription>View and manage your students</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4">Student Name</th>
                          <th className="text-left p-4">Email</th>
                          <th className="text-left p-4">Course</th>
                          <th className="text-left p-4">Progress</th>
                          <th className="text-left p-4">Last Active</th>
                          <th className="text-left p-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            name: "John Doe",
                            email: "john@example.com",
                            course: "Web Development",
                            progress: 78,
                            lastActive: "2 hours ago",
                          },
                          {
                            name: "Jane Smith",
                            email: "jane@example.com",
                            course: "Data Science",
                            progress: 92,
                            lastActive: "1 day ago",
                          },
                          {
                            name: "Robert Johnson",
                            email: "robert@example.com",
                            course: "UX/UI Design",
                            progress: 45,
                            lastActive: "3 hours ago",
                          },
                          {
                            name: "Emily Davis",
                            email: "emily@example.com",
                            course: "Mobile App Dev",
                            progress: 67,
                            lastActive: "Just now",
                          },
                          {
                            name: "Michael Wilson",
                            email: "michael@example.com",
                            course: "Web Development",
                            progress: 33,
                            lastActive: "5 days ago",
                          },
                        ].map((student, i) => (
                          <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                            <td className="p-4 font-medium">{student.name}</td>
                            <td className="p-4">{student.email}</td>
                            <td className="p-4">{student.course}</td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <span>{student.progress}%</span>
                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full ${
                                      student.progress >= 70
                                        ? "bg-green-500"
                                        : student.progress >= 40
                                          ? "bg-yellow-500"
                                          : "bg-red-500"
                                    }`}
                                    style={{ width: `${student.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">{student.lastActive}</td>
                            <td className="p-4">
                              <Button variant="ghost" size="sm">
                                View Profile
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

            <TabsContent value="schedule">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Schedule</CardTitle>
                  <CardDescription>Your upcoming classes and events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96 flex items-center justify-center bg-gray-100 rounded-md">
                    <p className="text-gray-500">Calendar view would appear here</p>
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
