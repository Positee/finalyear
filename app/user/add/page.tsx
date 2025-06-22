"use client"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { createStudent, createLecturer, createDean } from "@/app/actions/auth"
import { getAllDomitories } from "@/app/actions/data"
import { allDomitories } from "../page"



const AdminAdd = () => {
 const router = useRouter()
  const [activeTab, setActiveTab] = useState("student")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    matricNo: "",
    department: "",
    level: "",
    dormitoryId: "",
    staffNo: ""
  })
  const [dormitories, setDormitories] = useState<allDomitories[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    getAllDomitories().then(setDormitories)
  }, [])

  function resetForm() {
    setFormData({
      fullName: "",
      email: "",
      password: "",
      matricNo: "",
      department: "",
      level: "",
      dormitoryId: "",
      staffNo: ""
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    try {
      if (activeTab === "student") {
        await createStudent({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          matricNo: formData.matricNo,
          department: formData.department,
          level: formData.level,
          dormitoryId: formData.dormitoryId
        })
      } else if (activeTab === "lecturer") {
        await createLecturer({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          staffNo: formData.staffNo,
          department: formData.department
        })
      } else if (activeTab === "dean") {
        await createDean({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          staffNo: formData.staffNo
        })
      }
      setMessage("User created successfully!")
      resetForm()
    } catch (err) {
      console.error(err)
      setMessage("Failed to create user.")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Add New User</h1>
      <Button variant="outline" className="mb-6" onClick={() => router.push("/user")}>Back to Dashboard</Button>

      <Tabs defaultValue="student" onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="student">Add Student</TabsTrigger>
          <TabsTrigger value="lecturer">Add Lecturer</TabsTrigger>
          <TabsTrigger value="dean">Add Dean</TabsTrigger>
        </TabsList>

        <TabsContent value="student">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input value={formData.fullName} placeholder="Full Name" required onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
            <Input value={formData.email} placeholder="Email" type="email" required onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <Input value={formData.password} placeholder="Password" type="password" required onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            <Input value={formData.matricNo} placeholder="Matric No" required onChange={(e) => setFormData({ ...formData, matricNo: e.target.value })} />
            <Input value={formData.department} placeholder="Department" required onChange={(e) => setFormData({ ...formData, department: e.target.value })} />
            <Input value={formData.level} placeholder="Level" required onChange={(e) => setFormData({ ...formData, level: e.target.value })} />
             <label htmlFor="dormitory-select" className="text-sm font-medium text-gray-700">Dormitory</label>
            <select id="dormitory-select" value={formData.dormitoryId} required className="w-full border px-2 py-1 rounded" onChange={(e) => setFormData({ ...formData, dormitoryId: e.target.value })}>
              <option value="">Select Dormitory</option>
              {dormitories.map((dorm: any) => (
                <option key={dorm.id} value={dorm.id}>{dorm.name}</option>
              ))}
            </select>
            <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Add Student"}</Button>
            {message && <p className="text-sm text-center">{message}</p>}
          </form>
        </TabsContent>

        <TabsContent value="lecturer">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input value={formData.fullName} placeholder="Full Name" required onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
            <Input value={formData.email} placeholder="Email" type="email" required onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <Input value={formData.password} placeholder="Password" type="password" required onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            <Input value={formData.staffNo} placeholder="Staff No" required onChange={(e) => setFormData({ ...formData, staffNo: e.target.value })} />
            <Input value={formData.department} placeholder="Department" required onChange={(e) => setFormData({ ...formData, department: e.target.value })} />
            <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Add Lecturer"}</Button>
            {message && <p className="text-sm text-center">{message}</p>}
          </form>
        </TabsContent>

        <TabsContent value="dean">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input value={formData.fullName} placeholder="Full Name" required onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
            <Input value={formData.email} placeholder="Email" type="email" required onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <Input value={formData.password} placeholder="Password" type="password" required onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            <Input value={formData.staffNo} placeholder="Staff No" required onChange={(e) => setFormData({ ...formData, staffNo: e.target.value })} />
            <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Add Dean"}</Button>
            {message && <p className="text-sm text-center">{message}</p>}
          </form>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminAdd