'use server'

const { PrismaClient } = require("@prisma/client");
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

let users;
export async function GET() {
  try {
    users = await prisma.user.findMany({
      include: {
        order: true,
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new NextResponse(
      JSON.stringify({ message: "Error fetching users", }),
      { status: 500 }
    )
  }

  return new NextResponse(JSON.stringify(users), { status: 200 });
}
