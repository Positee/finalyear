"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { createDean, createLecturer, createStudent, logout } from "@/app/actions/auth"
import { getAllDeans, getAllLecturers, getAllStudents, getAllDomitories } from "@/app/actions/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"


type allStudents = {
    id: string;
    userId: string;
    matricNo: string;
    email: string;
    passwordHash: string;
    department: string;
    level: string;
    dormitoryId: string;
}

type allLecturers = {
    id: string;
    userId: string;
    email: string;
    passwordHash: string;
    department: string;
    staffNo: string;
}

type allDeans = {
    id: string;
    userId: string;
    email: string;
    passwordHash: string;
    staffNo: string;
}
export type allDomitories = {
  id: string;
    name: string;}


const date = Date.now()
console.log(date)
export default function AdminDash() {
  const router = useRouter()
  const [students, setStudents] = useState<allStudents[]>([])
  const [lecturers, setLecturers] = useState<allLecturers[]>([])
  const [deans, setDeans] = useState<allDeans[]>([])
  const [dormitories, setDormitories] = useState<allDomitories[]>([])
  const [activeTab, setActiveTab] = useState<"dean" | "lecturer" | "student">("dean")


 useEffect(() => {
  async function fetchData() {
    try {
      const [studentsRes, lecturersRes, deansRes, dormsRes] = await Promise.all([
        getAllStudents(),
        getAllLecturers(),
        getAllDeans(),
        getAllDomitories(),
      ])

      if (Array.isArray(studentsRes)) setStudents(studentsRes)
      if (Array.isArray(lecturersRes)) setLecturers(lecturersRes)
      if (Array.isArray(deansRes)) setDeans(deansRes)
      if (Array.isArray(dormsRes)) setDormitories(dormsRes)
    } catch (error) {
      console.error("Error fetching admin data:", error)
    }
  }
  fetchData()
}, [])

  async function handleLogout() {
    await logout()
  }

  return (
 <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white py-4">
        <div className="container flex justify-between items-center">
          <h1 className="font-bold text-2xl text-[#1c1d1f]">LearnHub</h1>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
      </header>

      <main className="flex-1 py-12 px-4 container max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

        <div className="mb-6">
          <Button onClick={() => router.push("/user/add")}>Go to Add Page</Button>
        </div>

        <Tabs defaultValue="students" className="w-full">
        <TabsList className="mb-4 flex gap-4 border-b pb-2">
  <TabsTrigger
    value="students"
    className="px-4 py-2 rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white hover:bg-blue-100 transition"
  >
    Students
  </TabsTrigger>
  <TabsTrigger
    value="lecturers"
    className="px-4 py-2 rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white hover:bg-blue-100 transition"
  >
    Lecturers
  </TabsTrigger>
  <TabsTrigger
    value="deans"
    className="px-4 py-2 rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white hover:bg-blue-100 transition"
  >
    Deans
  </TabsTrigger>
</TabsList>
<TabsContent value="students">
  <h3 className="text-xl font-bold mb-4">All Students</h3>
  {students.length === 0 ? (
    <p>No students enrolled</p>
  ) : (
    <div className="overflow-auto rounded-lg border">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Matric No</th>
            <th className="px-4 py-2">Department</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student: any) => (
            <tr key={student.id} className="border-t">
              <td className="px-4 py-2">{student.email ?? "N/A"}</td>
              <td className="px-4 py-2">{student.matricNo ?? "N/A"}</td>
              <td className="px-4 py-2">{student.department ?? "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</TabsContent>

<TabsContent value="lecturers">
  <h3 className="text-xl font-bold mb-4">All Lecturers</h3>
  {lecturers.length === 0 ? (
    <p>No lecturers enrolled</p>
  ) : (
    <div className="overflow-auto rounded-lg border">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Staff No</th>
            <th className="px-4 py-2">Department</th>
          </tr>
        </thead>
        <tbody>
          {lecturers.map((lecturer: any) => (
            <tr key={lecturer.id} className="border-t">
              <td className="px-4 py-2">{lecturer.email ?? "N/A"}</td>
              <td className="px-4 py-2">{lecturer.staffNo ?? "N/A"}</td>
              <td className="px-4 py-2">{lecturer.department ?? "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</TabsContent>

<TabsContent value="deans">
  <h3 className="text-xl font-bold mb-4">All Deans</h3>
  {deans.length === 0 ? (
    <p>No deans enrolled</p>
  ) : (
    <div className="overflow-auto rounded-lg border">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Staff No</th>
          </tr>
        </thead>
        <tbody>
          {deans.map((dean: any) => (
            <tr key={dean.id} className="border-t">
              <td className="px-4 py-2">{dean.email ?? "N/A"}</td>
              <td className="px-4 py-2">{dean.staffNo ?? "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</TabsContent>
        </Tabs>
      </main>

      <footer className="border-t py-6">
        <div className="container text-sm text-gray-500 text-center">
          © 2024 LearnHub, Inc.
        </div>
      </footer>
    </div>
  )
}
