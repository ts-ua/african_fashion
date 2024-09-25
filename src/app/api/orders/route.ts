// app/api/orders/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            include: {
                user: true,
                orderProducts: true,
            },
        });

        // Return the orders as JSON using NextResponse
        return NextResponse.json(orders, { status: 200 });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
