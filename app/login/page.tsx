"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { login, LoginResponse } from "../actions/auth"
import { useActionState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

const initialState = {
  error: null,
  success: false,
}

export default function LoginPage() {
  const [studentState, studentAction] = useActionState<LoginResponse, FormData>(login, initialState)
  const [lecturerState, lecturerAction] = useActionState<LoginResponse, FormData>(login, initialState)
  const [adminState, adminAction] = useActionState<LoginResponse, FormData>(login, initialState)

  const [isStudentSubmitting, setIsStudentSubmitting] = useState(false)
  const [isLecturerSubmitting, setIsLecturerSubmitting] = useState(false)
  const [isAdminSubmitting, setIsAdminSubmitting] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  useEffect(() => {
    if (studentState.success && studentState.redirectTo) {
      router.push(studentState.redirectTo)
    }
  }, [studentState.success, studentState.redirectTo, router])

  useEffect(() => {
    if (lecturerState.success && lecturerState.redirectTo) {
      router.push(lecturerState.redirectTo)
    }
  }, [lecturerState.success, lecturerState.redirectTo, router])

  useEffect(() => {
    if (adminState.success && adminState.redirectTo) {
      router.push(adminState.redirectTo)
    }
  }, [adminState.success, adminState.redirectTo, router])
  // Handle form submissions with loading states
  const handleStudentSubmit = async (formData: FormData) => {
    setIsStudentSubmitting(true)
    formData.append("role", "STUDENT")
    await studentAction(formData)
   
    // If we reach here, there was an error (otherwise we would have redirected)
    setIsStudentSubmitting(false)
  }

  const handleLecturerSubmit = async (formData: FormData) => {
    setIsLecturerSubmitting(true)
    formData.append('role', 'LECTURER')
    await lecturerAction(formData)
    setIsLecturerSubmitting(false)
  }

  const handleAdminSubmit = async (formData: FormData) => {
    setIsAdminSubmitting(true)
    formData.append('role', 'DEAN')
    await adminAction(formData)
    setIsAdminSubmitting(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white py-4">
        <div className="container">
          <Link href="/" className="font-bold text-2xl text-[#1c1d1f]">
            LearnHub
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Log in to LearnHub</h1>
            <p className="text-gray-500 mt-2">Select your role to continue</p>

            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
                {error === "session-expired"
                  ? "Your session has expired. Please log in again."
                  : "You need to log in to access that page."}
              </div>
            )}
          </div>

          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="lecturer">Lecturer</TabsTrigger>
              <TabsTrigger value="dean">Dean</TabsTrigger>
            </TabsList>

            <TabsContent value="student">
              <form action={handleStudentSubmit} className="space-y-4">
                <input type="hidden" name="role" value="student" />

                <div className="space-y-2">
                  <Label htmlFor="student-id">Email</Label>
                  <Input
                    id="student-id"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    className={`py-6 ${studentState.error?.id ? "border-red-500" : ""}`}
                  />
                  {studentState.error?.id && <p className="text-sm text-red-500">{studentState.error.id[0]}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="student-password">Password</Label>
                  <Input
                    id="student-password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className={`py-6 ${studentState.error?.password ? "border-red-500" : ""}`}
                  />
                  {studentState.error?.password && (
                    <p className="text-sm text-red-500">{studentState.error.password[0]}</p>
                  )}
                </div>

                {studentState.error?.general && (
                  <div className="p-3 bg-red-50 text-red-700 rounded-md">{studentState.error.general[0]}</div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-[#a435f0] hover:bg-[#8710d8] text-white py-6"
                  disabled={isStudentSubmitting}
                >
                  {isStudentSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Log in as Student"
                  )}
                </Button>

                <div className="text-sm text-center">
                  <p className="text-gray-500">Demo credentials: john@example.com / password123</p>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="lecturer">
              <form action={handleLecturerSubmit} className="space-y-4">
                <input type="hidden" name="role" value="lecturer" />

                <div className="space-y-2">
                  <Label htmlFor="lecturer-id">Email</Label>
                  <Input
                    id="lecturer-id"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    className={`py-6 ${lecturerState.error?.id ? "border-red-500" : ""}`}
                  />
                  {lecturerState.error?.id && <p className="text-sm text-red-500">{lecturerState.error.id[0]}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lecturer-password">Password</Label>
                  <Input
                    id="lecturer-password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className={`py-6 ${lecturerState.error?.password ? "border-red-500" : ""}`}
                  />
                  {lecturerState.error?.password && (
                    <p className="text-sm text-red-500">{lecturerState.error.password[0]}</p>
                  )}
                </div>

                {lecturerState.error?.general && (
                  <div className="p-3 bg-red-50 text-red-700 rounded-md">{lecturerState.error.general[0]}</div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-[#a435f0] hover:bg-[#8710d8] text-white py-6"
                  disabled={isLecturerSubmitting}
                >
                  {isLecturerSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Log in as Lecturer"
                  )}
                </Button>

                <div className="text-sm text-center">
                  <p className="text-gray-500">Demo credentials: emily.smith@example.com / password123</p>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="dean">
              <form action={handleAdminSubmit} className="space-y-4">
                <input type="hidden" name="role" value="dean" />

                <div className="space-y-2">
                  <Label htmlFor="admin-id">Email</Label>
                  <Input
                    id="admin-id"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    className={`py-6 ${adminState.error?.id ? "border-red-500" : ""}`}
                  />
                  {adminState.error?.id && <p className="text-sm text-red-500">{adminState.error.id[0]}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <Input
                    id="admin-password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className={`py-6 ${adminState.error?.password ? "border-red-500" : ""}`}
                  />
                  {adminState.error?.password && <p className="text-sm text-red-500">{adminState.error.password[0]}</p>}
                </div>

                {adminState.error?.general && (
                  <div className="p-3 bg-red-50 text-red-700 rounded-md">{adminState.error.general[0]}</div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-[#a435f0] hover:bg-[#8710d8] text-white py-6"
                  disabled={isAdminSubmitting}
                >
                  {isAdminSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Log in as Dean"
                  )}
                </Button>

                <div className="text-sm text-center">
                  <p className="text-gray-500">Demo credentials: admin@example.com / password123</p>
                </div>
              </form>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-6">
            <div className="text-sm text-gray-500">
              Forgot your password?
              <Link href="#" className="text-[#a435f0] hover:underline ml-1">
                Reset Password
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="font-bold text-xl mb-4 md:mb-0">LearnHub</div>
            <div className="text-sm text-gray-500">© 2024 LearnHub, Inc.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
