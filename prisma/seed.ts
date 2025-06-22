import { PrismaClient, Role, AttendanceStatus } from "@prisma/client"
import { hash } from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // Clear existing data
  await prisma.attendanceRecord.deleteMany()
  await prisma.session.deleteMany()
  await prisma.enrollment.deleteMany()
  await prisma.course.deleteMany()
  await prisma.user.deleteMany()

  // Create users
  console.log("Creating users...")

  // Create students
  const student1 = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      password: await hash("password123", 10),
      role: Role.STUDENT,
    },
  })

  const student2 = await prisma.user.create({
    data: {
      name: "Jane Smith",
      email: "jane@example.com",
      password: await hash("password123", 10),
      role: Role.STUDENT,
    },
  })

  const student3 = await prisma.user.create({
    data: {
      name: "Robert Johnson",
      email: "robert@example.com",
      password: await hash("password123", 10),
      role: Role.STUDENT,
    },
  })

  const student4 = await prisma.user.create({
    data: {
      name: "Emily Davis",
      email: "emily@example.com",
      password: await hash("password123", 10),
      role: Role.STUDENT,
    },
  })

  const student5 = await prisma.user.create({
    data: {
      name: "Michael Wilson",
      email: "michael@example.com",
      password: await hash("password123", 10),
      role: Role.STUDENT,
    },
  })

  // Create lecturers
  const lecturer1 = await prisma.user.create({
    data: {
      name: "Dr. Emily Smith",
      email: "emily.smith@example.com",
      password: await hash("password123", 10),
      role: Role.LECTURER,
    },
  })

  const lecturer2 = await prisma.user.create({
    data: {
      name: "Prof. Michael Brown",
      email: "michael.brown@example.com",
      password: await hash("password123", 10),
      role: Role.LECTURER,
    },
  })

  // Create admin
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@example.com",
      password: await hash("password123", 10),
      role: Role.ADMIN,
    },
  })

  // Create courses
  console.log("Creating courses...")
  const webDev = await prisma.course.create({
    data: {
      name: "Web Development",
      code: "CS101",
      description: "Introduction to web development with HTML, CSS, and JavaScript",
      lecturerId: lecturer1.id,
    },
  })

  const dataStructures = await prisma.course.create({
    data: {
      name: "Data Structures",
      code: "CS201",
      description: "Fundamental data structures and algorithms",
      lecturerId: lecturer1.id,
    },
  })

  const databaseSystems = await prisma.course.create({
    data: {
      name: "Database Systems",
      code: "CS301",
      description: "Introduction to database design and SQL",
      lecturerId: lecturer2.id,
    },
  })

  // Create enrollments
  console.log("Creating enrollments...")
  await prisma.enrollment.createMany({
    data: [
      { studentId: student1.id, courseId: webDev.id },
      { studentId: student1.id, courseId: dataStructures.id },
      { studentId: student2.id, courseId: webDev.id },
      { studentId: student2.id, courseId: databaseSystems.id },
      { studentId: student3.id, courseId: dataStructures.id },
      { studentId: student4.id, courseId: databaseSystems.id },
      { studentId: student5.id, courseId: dataStructures.id },
      { studentId: student5.id, courseId: webDev.id },
    ],
  })

  // Create sessions
  console.log("Creating sessions...")
  const webDevSession = await prisma.session.create({
    data: {
      courseId: webDev.id,
      date: new Date("2024-05-21"),
      startTime: "09:00",
      endTime: "11:00",
      topic: "Introduction to JavaScript",
    },
  })

  const dataStructuresSession = await prisma.session.create({
    data: {
      courseId: dataStructures.id,
      date: new Date("2024-05-20"),
      startTime: "14:00",
      endTime: "16:00",
      topic: "Binary Trees",
    },
  })

  // Create attendance records
  console.log("Creating attendance records...")
  await prisma.attendanceRecord.createMany({
    data: [
      {
        sessionId: webDevSession.id,
        studentId: student1.id,
        status: AttendanceStatus.PRESENT,
        timestamp: new Date("2024-05-21T09:05:22"),
      },
      {
        sessionId: webDevSession.id,
        studentId: student2.id,
        status: AttendanceStatus.LATE,
        timestamp: new Date("2024-05-21T09:15:45"),
        notes: "Arrived 15 minutes late",
      },
      {
        sessionId: dataStructuresSession.id,
        studentId: student3.id,
        status: AttendanceStatus.PRESENT,
        timestamp: new Date("2024-05-20T14:05:33"),
      },
      {
        sessionId: dataStructuresSession.id,
        studentId: student5.id,
        status: AttendanceStatus.ABSENT,
        timestamp: new Date("2024-05-20T14:00:00"),
        notes: "No notification provided",
      },
    ],
  })

  console.log("Seeding completed!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
