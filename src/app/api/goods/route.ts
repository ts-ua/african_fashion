import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const text = searchParams.get("text");

    if (!text) {
        return new NextResponse(
            JSON.stringify({ message: "Missing text parameter" }),
            { status: 400 }
        );
    }

    let goods;

    if (text === "all") {
        goods = await prisma.good.findMany();
    } else {
        try {
            console.log("text:", text);

            goods = await prisma.$queryRaw`SELECT * FROM public."Good" WHERE to_tsvector('english', name) @@ plainto_tsquery('english', ${text})`;
        } catch (error) {
            console.error("Error executing query:", error);
            return new NextResponse(
                JSON.stringify({ message: "Error fetching goods" }),
                { status: 500 }
            );
        }
    }

    return new NextResponse(JSON.stringify(goods), { status: 200 });
}
