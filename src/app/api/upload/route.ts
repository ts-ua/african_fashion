
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';


export async function POST(req: any) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const productData = JSON.parse(formData.get('productData'));

    if (!file) {
      return NextResponse.json({ error: 'File not provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Generate a secret/unique file name using a hash
    const uniqueName = `${crypto.randomBytes(16).toString('hex')}-${file.name}`;
    const uploadPath = path.join(process.cwd(), 'public', `uploads/${productData.name}`, uniqueName);
    await fs.promises.mkdir(path.dirname(uploadPath), { recursive: true });
    await fs.promises.writeFile(uploadPath, buffer);

    await prisma.good.create({
      data: {
        name: productData.name,
        price: productData.price,
        set: productData.set,
        coverImage: `/uploads/${productData.name}/${uniqueName}`,
        maxGuests: productData.maxGuests,
        type: productData.type,
        recommended: productData.recommended,
        description: '',
      },
    });

    return NextResponse.json({ message: 'File uploaded successfully', file: file.name });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};