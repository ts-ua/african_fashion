// pages/api/auth/register.js

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: any) {
    try {
        const body = await request.json();
        const { email, password } = body;
        if (!email || !password) {
            return new NextResponse(
                JSON.stringify({ message: 'Email and password are required' }),
                { status: 400 }
            );
        }
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return new NextResponse(
                JSON.stringify({ message: 'Invalid email or password' }),
                { status: 400 }
            );
        }
        const isPasswordValid = async (password: string | null, userPassword: string) => {
            if (password === null) {
                throw new Error('Password cannot be null');
            }
            return await bcrypt.compare(password, userPassword);
        };

        const userPassword = user.password ?? '';
        const isValid = await isPasswordValid(password, userPassword);
        if (!isValid) {
            return new NextResponse(
                JSON.stringify({ message: 'Invalid email or password' }),
                { status: 400 }
            );
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'default_secret');
        return new NextResponse(
            JSON.stringify({ message: 'Login successful', token, user }),
            { status: 200 }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: 'Error registering user' }),
            { status: 500 }
        );
    }
}

