
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request: any) {
    try {
        const body = await request.json();
        const { name, email, password } = body;
        if (!name || !email || !password) {
            return new NextResponse(
                JSON.stringify({ message: 'All fields are required' }),
                { status: 400 }
            );
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return new NextResponse(
                JSON.stringify({ message: 'Email already in use' }),
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.createMany({
            data: [
                {
                    name: name,
                    email: email,
                    password: hashedPassword,
                    role: email === "Clinton123@gmail.com" ? "admin" : "user",
                }
            ]
        });

        return new NextResponse(
            JSON.stringify({ message: 'User registered successfully' }),
            { status: 201 }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: 'Error registering user' }),
            { status: 500 }
        );
    }
}

export async function GET() {
    return new NextResponse(
        JSON.stringify({ message: 'Method not allowed' }),
        { status: 405 }
    );
}
