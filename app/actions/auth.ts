"use server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { compare, hash } from "bcrypt"
import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

export type Institution = {
  id: string
  name: string
  email: string
  phone?: string
}

export type User = {
  id: string
  name: string
  email: string
  password: string
  role: "admin" | "student" | "lecturer"
  institutionId?: string
}


// Login response type
export type LoginResponse = {
  error: AuthError | null
  success: boolean
  redirectTo?: string
}


// Authentication error types
export type AuthError = {
  id?: string[]
  password?: string[]
  general?: string[]
}

export async function registerInstitutionWithAdmin({
  institutionName,
  email,
  phone,
  adminName,
  password,
}: {
  institutionName: string
  email: string
  phone: string
  adminName: string
  password: string
}) {
  const existing = await prisma.institution.findFirst({ where: { contactEmail: email} })

  if (existing) {
    return { success: false, message: "Institution already exists" }
  }

  const institution = await prisma.institution.create({
    data: {
      name: institutionName,
      contactEmail: email,
      phoneNumber: phone,
      user: {
        create: {
          fullName: adminName,
          email,
          passwordHash: await hash(password, 10)
        }
      }
    }
  })

  return { success: true, institution }
}
export async function createStudent(data: {
  fullName: string;
  email: string;
  password: string;
  matricNo: string;
  department: string;
  level: string;
  dormitoryId: string;
}) {
  const session = await getCurrentUser();
  if (!session) throw new Error("Unauthorized");

  const hashedPassword = await hash(data.password, 10);

  const newStudent = await prisma.student.create({
    data: {
      email: data.email,
      passwordHash: hashedPassword,
      matricNo: data.matricNo,
      department: data.department,
      level: data.level,
      dormitoryId: data.dormitoryId,
      userId: session.id
    },
  });

  // Trigger device into register mode for this student
  await prisma.deviceState.upsert({
    where: { id: "main-device" },
    update: {
      mode: "register",
      studentId: newStudent.id,
    },
    create: {
      id: "main-device",
      mode: "register",
      studentId: newStudent.id,
    },
  });

  return newStudent;
}
export async function createLecturer(data: {
  fullName: string;
  email: string;
  password: string;
  staffNo: string;
  department: string;
}) {
  const session = await getCurrentUser();
  if (!session) throw new Error("Unauthorized");

  const hashedPassword = await hash(data.password, 10);

  return await prisma.lecturer.create({
    data: {
      email: data.email,
      passwordHash: hashedPassword,
      staffNo: data.staffNo,
      department: data.department,
      user: {
        connect: {
          id: session.id,
        },
      },
    },
  });
}

export async function createDean(data: {
  fullName: string;
  email: string;
  password: string;
  staffNo: string;
}) {
  const session = await getCurrentUser();
  if (!session) throw new Error("Unauthorized");

  const hashedPassword = await hash(data.password, 10);

  return await prisma.dean.create({
    data: {
      email: data.email,
      passwordHash: hashedPassword,
      staffNo: data.staffNo,
      user: {
        connect: {
          id: session.id,
        },
      },
    },
  });
}



// Login function
export async function login(
  prevState: { error: AuthError | null; success: boolean },
  formData: FormData
) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const role = formData.get("role") as string

  if (!email || !password || !role) {
    return {
      error: {
        general: ["Please fill in all fields"],
      },
      success: false,
    }
  }

  try {
    let user: any = null

    if (role === "student") {
      user = await prisma.student.findFirst({ where: { email } })
    } else if (role === "lecturer") {
      user = await prisma.lecturer.findFirst({ where: { email } })
    } else if (role === "dean") {
      user = await prisma.dean.findFirst({ where: { email} })
    } else {
      return {
        error: {
          role: ["Invalid role"],
        },
        success: false,
      }
    }

    if (!user) {
      return {
        error: {
          id: ["User not found"],
        },
        success: false,
      }
    }

    const passwordMatch = await compare(password, user.passwordHash)

    if (!passwordMatch) {
      return {
        error: {
          password: ["Incorrect password"],
        },
        success: false,
      }
    }

    // Build the session
    const session = {
      userId: user.id,
      name: user.fullName ?? user.email,
      email: user.email,
      role: role.toLowerCase(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 1 day
    }

    // Set cookie
    await (await cookies()).set("session", JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
    })

    return {
      error: null,
      success: true,
      redirectTo: `/${role.toLowerCase()}/dashboard`,
    }
  } catch (error) {
    console.error("Login error:", error)
    return {
      error: {
        general: ["An unexpected error occurred. Please try again."],
      },
      success: false,
    }
  }
}


export const adminLogin = async(formData: {email: string, password: string}) => {
  const {email, password} = formData
  if(!email|| !password){
    return
  }
  const user = await prisma.user.findUnique({where: {email}})
  if(!user) return
     const passwordMatch = await compare(password, user.passwordHash)

    if (!passwordMatch) {
      return 
    }

    // Build the session
    const session = {
      userId: user.id,
      name: user.fullName ?? user.email,
      email: user.email,
      role: "admin",
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 1 day
    }

    // Set cookie
    await (await cookies()).set("session", JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
    })
    return { success: true }

}
// Logout function
export async function logout() {
  (await cookies()).delete("session")
  redirect("/login")
}

// Get current user from session
export async function getCurrentUser() {
  const sessionCookie = (await cookies()).get("session")
  
  if (!sessionCookie) {
    return null
  }

  try {
    const session = JSON.parse(sessionCookie.value)
    
    // Check if session is expired
    if (session.expiresAt < Date.now()) {
      (await cookies()).delete("session")
      return null
    }

    const role = session.role
    let currentUser;

    if(role == "student"){
      currentUser = await prisma.student.findFirst({where: {email: session.email}})
    }
    if(role=="lecturer"){
      currentUser = await prisma.lecturer.findFirst({where: {email: session.email}})
    }
    if(role=="dean"){
      currentUser = await prisma.dean.findFirst({where: {email: session.email}})
      }
      if(role=="admin"){
        currentUser = await prisma.user.findFirst({where: {email: session.email}})
      }

    
    if (!currentUser) {
      (await cookies()).delete("session")
      return null
    }

    return {
      id: currentUser.id,
      email: currentUser.email,
      role: session.role.toLowerCase(),
    }
  } catch (error) {
    console.error("Session error:", error)
    return null
  }
}

// Check if user is authenticated and has the correct role
export async function requireAuth(roles: string[]) {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect("/login")
  }

  if (!roles.includes(user.role)) {
    // Redirect to appropriate dashboard if authenticated but wrong role
    redirect(`/${user.role}/dashboard`)
  }

  return user
}

export async function createDormitory(data: {
  name: string
  location: string
}) {
  // Get the currently logged-in user from session cookie
  const currentUser = await getCurrentUser()

  // Check if the user is authenticated and is an admin
  if (!currentUser || currentUser.role !== "admin") {
    throw new Error("Unauthorized")
  }

  // Fetch the user's institutionId
  const user = await prisma.user.findUnique({
    where: { email: currentUser.email },
    select: { institutionId: true }
  })

  if (!user) {
    throw new Error("User not found")
  }

  // Create the dormitory with institutionId
  const dormitory = await prisma.dormitory.create({
    data: {
      name: data.name,
      location: data.location,
      institutionId: user.institutionId
    }
  })

  return dormitory
}

export async function getUserIdentityNumber(user:  {
    id: string;
    email: string;
    role: string;
} ): Promise<string | null> {

  if (user.role === "student") {
    const student = await prisma.student.findUnique({
      where: { id: user.id },
      select: { matricNo: true }
    })
    return student?.matricNo || null
  }

  if (user.role === "lecturer" ) {
    const staff = await prisma.lecturer.findUnique({
      where: { id: user.id },
      select: { staffNo: true }
    })
    return staff?.staffNo || null
  }
  if(user.role === "dean"){
    const dean = await prisma.dean.findUnique({
      where: { id: user.id },
      select: { staffNo: true }
      })
      return dean?.staffNo || null
  }

  return null
}
