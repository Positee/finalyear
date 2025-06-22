

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"

import { Suspense } from "react"
import { getCurrentUser, getUserIdentityNumber, requireAuth } from "@/app/actions/auth"
import { LogoutButton } from "@/components/logout-button"
import { LecturerDashboard } from "@/components/LectureDashboard"
import LecturerDashboardClient from "./client"

export default async function LecturerDashboardPage() {
  // Check if user is authenticated and has lecturer role
  const user = await requireAuth(["lecturer"])
  const test = await getCurrentUser()
  const staffNo = await getUserIdentityNumber(test!)
  

  return (
   <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r">
        <div className="p-4 border-b">
          <Link href="/" className="font-bold text-xl text-[#1c1d1f]">
            LearnHub
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
        </nav>
        <div className="p-4 border-t">
          <div className="font-medium text-sm">{user.email}</div>
          <div className="font-medium text-sm">{staffNo}</div>
          <div className="text-xs text-gray-500 mb-2">ID: {user.id}</div>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <header className="bg-white border-b sticky top-0 z-10 p-4">
          <h1 className="text-xl font-bold">Today's Class Attendance</h1>
        </header>

        <Suspense fallback={<div className="p-6">Loading attendance...</div>}>
          <LecturerDashboardClient/>
        </Suspense>
      </main>
    </div>
  )
}


