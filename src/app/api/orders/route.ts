'use server'

const { PrismaClient } = require("@prisma/client");
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const orders = await prisma.orders.findMany({
            include: {
                user: true,
                orderProducts: true,
            },
        });

        return NextResponse.json(orders, { status: 200 });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
