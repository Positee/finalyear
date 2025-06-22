"use server"

import { PrismaClient } from "@prisma/client";
import { getCurrentUser } from "./auth";


const prisma = new PrismaClient();


export const getAllStudents = async() => {
    try{
        const currentUser = await getCurrentUser();
        const students = await prisma.student.findMany({
            where: {
                userId: currentUser?.id
                }
                });
                return students;
    }catch(error){
        console.log(error);
    }
}

export const getAllLecturers = async() => {
    try{
        const currentUser = await getCurrentUser();
        const lecturers = await prisma.lecturer.findMany({
            where: {
                userId: currentUser?.id
                }
                });
                return lecturers;
    }catch(error){
        console.log(error);
    }
}

export const getAllDeans = async() => {
    try{
        const currentUser = await getCurrentUser();
        const lecturers = await prisma.dean.findMany({
            where: {
                userId: currentUser?.id
                }
                });
                return lecturers;
    }catch(error){
        console.log(error);
    } 
}

export const getAllDomitories = async() => {
    try{
          const currentUser = await getCurrentUser()
    if (!currentUser?.id) return []

    // Get the full user to retrieve their institutionId
    const admin = await prisma.user.findUnique({
      where: { id: currentUser.id },
      select: { institutionId: true }
    })

    if (!admin?.institutionId) return []

    // Fetch dormitories by institutionId
    const dormitories = await prisma.dormitory.findMany({
      where: { institutionId: admin.institutionId },
      select: { id: true, name: true }
    })

    return dormitories
  } catch (error) {
    console.error("Failed to fetch dormitories:", error)
    return []
  }
}