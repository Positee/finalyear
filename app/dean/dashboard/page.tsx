import { getCurrentUser, getUserIdentityNumber, requireAuth } from "@/app/actions/auth"
import { getDormitoryAttendance } from "@/app/actions/attendance"
import DeanDashboardClient from "./client"
import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"
import { LogoutButton } from "@/components/logout-button"

export default async function DeanDashboardPage() {
  const user = await requireAuth(["dean"])
  const test = await getCurrentUser()
  const staffNo = await getUserIdentityNumber(test!)
  const records = await getDormitoryAttendance()

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="hidden md:flex w-64 flex-col bg-white border-r">
        <div className="p-4 border-b">
          <Link href="/" className="font-bold text-xl text-[#1c1d1f]">
            LearnHub
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Button variant="secondary" className="w-full justify-start bg-gray-100">
            <Users className="mr-2 h-4 w-4" />
            Dorm Attendance
          </Button>
        </nav>
        <div className="p-4 border-t">
          <div className="font-medium text-sm">{user.email}</div>
          <div className="font-medium text-sm">{staffNo}</div>
          <div className="text-xs text-gray-500 mb-2">ID: {user.id}</div>
          <LogoutButton />
        </div>
      </aside>

      <main className="flex-1">
        <header className="bg-white border-b sticky top-0 z-10 p-4">
          <h1 className="text-xl font-bold">Dean Dashboard</h1>
        </header>

        <Suspense fallback={<div className="p-6">Loading dorm attendance...</div>}>
          <DeanDashboardClient initialData={records} />
        </Suspense>
      </main>
    </div>
  )
}
