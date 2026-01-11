"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createSchool(data: { name: string; domain: string }) {
  try {
    // Generate slug from name (simple version - you might want to use a slug library)
    const slug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const school = await prisma.school.create({
      data: {
        name: data.name,
        domain: data.domain,
        slug: slug,
        isActive: true,
      },
    });

    revalidatePath("/schools");
    return { success: true, data: school };
  } catch (error: any) {
    console.error("Error creating school:", error);
    return {
      success: false,
      error: error.message || "فشل في إنشاء المدرسة",
    };
  }
}

export async function getSchools() {
  try {
    const schools = await prisma.school.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        domain: true,
        logoUrl: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return { success: true, data: schools };
  } catch (error: any) {
    console.error("Error fetching schools:", error);
    return {
      success: false,
      error: error.message || "فشل في جلب المدارس",
      data: [],
    };
  }
}
