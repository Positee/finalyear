'use client'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { sendOTP } from "../actions/send-otp"
import { verifyOTP } from "../actions/verify-otp"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { registerInstitutionWithAdmin } from "../actions/auth"
 const SignUp = () => {
  const router = useRouter()
  const [step, setStep] = useState<"email" | "verify" |"details"| "success">("email")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    institutionName: "",
    adminName: "",
    phone: "",
    password: "",
    confirmPassword: ""
  })

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const res = await sendOTP(email)
      if (res.success) {
        setStep("verify")
      } else {
        setError("Failed to send OTP")
      }
    } catch (err) {
      setError("Something went wrong")
    }

    setIsSubmitting(false)
  }

  async function handleOtpSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const res = await verifyOTP(email, otp)
      if (res.success) {
        setStep("details")
      } else {
        setError(res.message || "Invalid OTP")
      }
    } catch (err) {
      setError("Something went wrong")
    }

    setIsSubmitting(false)
  }

async function handleDetailsSubmit(e: React.FormEvent) {
  e.preventDefault()
  setIsSubmitting(true)
  setError("")

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match")
    setIsSubmitting(false)
    return
  }

  try {
    const res = await registerInstitutionWithAdmin({
      institutionName: formData.institutionName,
      email,
      phone: formData.phone,
      adminName: formData.adminName,
      password: formData.password
    })

    if (res.success) {
      setStep("success")
    } else {
      setError(res.message || "Failed to register")
    }
  } catch (err) {
    setError("Something went wrong during registration")
  }

  setIsSubmitting(false)
}

   function handleLoginRedirect() {
    router.push("/admin-login")
  }
    return (
           <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white py-4">
        <div className="container">
          <h1 className="font-bold text-2xl text-[#1c1d1f]">LearnHub</h1>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Register Your Institution</h1>
            <p className="text-gray-500 mt-2">Sign up to manage your students’ attendance</p>
          </div>

          {step === "email" && (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Institution Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. admin@university.edu"
                  required
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Sending OTP...</>
                ) : (
                  "Send Verification Code"
                )}
              </Button>
            </form>
          )}

          {step === "verify" && (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP sent to {email}</Label>
                <Input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Verifying...</>
                ) : (
                  "Verify Code"
                )}
              </Button>
            </form>
          )}

          {step === "details" && (
            <form onSubmit={handleDetailsSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="institutionName">Institution Name</Label>
                <Input
                  id="institutionName"
                  value={formData.institutionName}
                  onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adminName">Admin Full Name</Label>
                <Input
                  id="adminName"
                  value={formData.adminName}
                  onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Contact Number (optional)</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Creating Account...</>
                ) : (
                  "Register Institution"
                )}
              </Button>
            </form>
          )}

          {step === "success" && (
            <div className="text-center space-y-4">
              <h2 className="text-green-600 font-semibold text-xl">✅ Account created successfully!</h2>
              <p className="text-gray-600">
                Your institution admin account has been created. You can now proceed to login.
              </p>
              <Button className="mt-4 w-full" onClick={handleLoginRedirect}>Proceed to Login</Button>
            </div>
          )}
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


export default SignUp