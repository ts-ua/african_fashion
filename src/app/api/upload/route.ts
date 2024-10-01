import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(process.cwd(), 'public', 'images');
      fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

export async function POST(request: any) {
  try {
    const formData = await request.formData();
    const image = formData.get('image');
    const productData = JSON.parse(formData.get('productData'));

    await prisma.good.create({
      data: {
        name: productData.name,
        price: productData.price,
        set: productData.set,
        coverImage: `/images/${image.name}`,
        maxGuests: productData.maxGuests,
        type: productData.type,
        recommended: productData.recommended,
        description: ''
      },
    });

    return new NextResponse(
      JSON.stringify({ message: 'New Product registered successfully' }),
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: 'Error registering product' }),
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
