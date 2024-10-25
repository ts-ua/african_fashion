import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export async function POST(req: any, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const productData = JSON.parse(formData.get('productData'));

    if (!id) {
      return NextResponse.json({ error: 'Product ID not provided' }, { status: 400 });
    }

    // Check if the product exists
    const existingProduct = await prisma.good.findUnique({ where: { id } });
    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    let coverImagePath = existingProduct.coverImage;
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uniqueName = `${crypto.randomBytes(16).toString('hex')}-${file.name}`;
      const uploadPath = path.join(process.cwd(), 'public', `uploads/${productData.name}`, uniqueName);
      await fs.promises.mkdir(path.dirname(uploadPath), { recursive: true });
      await fs.promises.writeFile(uploadPath, buffer);

      coverImagePath = `/uploads/${productData.name}/${uniqueName}`;
    }

    await prisma.good.update({
      where: { id },
      data: {
        name: productData.name,
        price: productData.price,
        set: productData.set,
        coverImage: coverImagePath,
      },
    });

    return NextResponse.json({ message: 'Product updated successfully' });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};