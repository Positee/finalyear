import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Search, User } from "lucide-react"
import { getCurrentUser, getUserIdentityNumber, requireAuth } from "@/app/actions/auth"
import { LogoutButton } from "@/components/logout-button"
import StudentDashboardClient from "./client"

export default async function StudentDashboardPage() {
  // Check if user is authenticated and has student role
  const user = await requireAuth(["student"])
  const test = await getCurrentUser()
  const matricNo = await getUserIdentityNumber(test!)
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
            <User className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Calendar className="mr-2 h-4 w-4" />
            Attendance
          </Button>
        </nav>
        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#a435f0] flex items-center justify-center text-white">
            </div>
            <div>
              <div className="font-medium">{user.email}</div>
              <div className="font-medium">{matricNo}</div>
              <div className="text-xs text-gray-500">ID: {user.id}</div>
            </div>
          </div>
          <div className="mt-4">
            <LogoutButton />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-bold">Student Attendance</h1>
          </div>
        </header>

        <Suspense fallback={<div className="p-6">Loading attendance...</div>}>
          <StudentDashboardClient user={user} />
        </Suspense>
      </div>
    </div>
  )
}
