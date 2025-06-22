import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-bold text-2xl text-[#1c1d1f]">
              LearnHub
            </Link>
          </div>
          <div className="hidden md:flex relative w-full max-w-sm mx-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="search"
              placeholder="Search for courses"
              className="w-full rounded-full border border-gray-300 bg-white pl-8 pr-4 py-2 text-sm"
            />
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" className="text-sm font-medium">
                Log in
              </Button>
            </Link>
            <Link href="/sign-up"><Button className="bg-[#a435f0] hover:bg-[#8710d8] text-white text-sm font-medium">Sign up</Button></Link>
            
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-[#1c1d1f] text-white">
          <div className="container py-16 md:py-24 relative z-10">
            <div className="max-w-md">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Learning Management System</h1>
              <p className="text-lg mb-6">
                Track your academic progress and attendance with our comprehensive platform.
              </p>
              <Link href="/login">
                <Button className="bg-white text-[#1c1d1f] hover:bg-gray-100 font-medium">Get Started</Button>
              </Link>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#1c1d1f] to-transparent z-0"></div>
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('/placeholder.svg?height=600&width=800')] bg-cover bg-center z-[-1]"></div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="w-12 h-12 bg-[#a435f0] rounded-full flex items-center justify-center text-white mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Student Attendance</h3>
                <p className="text-gray-600">
                  Track your course attendance and view your attendance history for all enrolled courses.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="w-12 h-12 bg-[#a435f0] rounded-full flex items-center justify-center text-white mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Lecturer Management</h3>
                <p className="text-gray-600">
                  Manage course attendance with timestamps and download attendance records for your courses.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="w-12 h-12 bg-[#a435f0] rounded-full flex items-center justify-center text-white mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Admin Dashboard</h3>
                <p className="text-gray-600">
                  Comprehensive view of course and dormitory attendance with detailed timestamps and reporting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#f7f9fa]">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Learning Management System"
                  className="rounded-lg"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-4">Start tracking attendance today</h2>
                <p className="text-lg mb-6">
                  Our platform provides a seamless experience for students, lecturers, and administrators to manage and
                  track attendance across courses and dormitories.
                </p>
                <Link href="/login">
                  <Button className="bg-[#a435f0] hover:bg-[#8710d8] text-white">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#1c1d1f] text-white py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t border-gray-700">
            <div className="font-bold text-2xl mb-4 md:mb-0">LearnHub</div>
            <div className="text-sm">© 2025 LearnHub, Inc.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
