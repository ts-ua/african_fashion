
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';


export async function POST(req: any) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const updatedData = JSON.parse(formData.get('UpdatedData'));

    if (!file) {
      return NextResponse.json({ error: 'File not provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uniqueName = `${crypto.randomBytes(16).toString('hex')}-${file.name}`;
    const uploadPath = path.join(process.cwd(), 'public', `uploads/${updatedData.name}`, uniqueName);
    await fs.promises.mkdir(path.dirname(uploadPath), { recursive: true });
    await fs.promises.writeFile(uploadPath, buffer);


    if (updatedData?.id) {
      await prisma.user.update({
        where: {
          id: updatedData?.id,

        },
        data: {
          name: updatedData.name,
          email: updatedData.email,
          image: `/uploads/${updatedData.name}/${uniqueName}`,
          phone: updatedData.phone
        },
      });
    } else {
      throw new Error("User id or email must be provided for update");
    }


    return NextResponse.json({ message: 'File uploaded successfully', file: file.name });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};