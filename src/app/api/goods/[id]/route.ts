import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  console.log("id:", id)
  try {
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
    }

    await prisma.good.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Good deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ message: 'Error deleting good' }, { status: 500 });
  }
}