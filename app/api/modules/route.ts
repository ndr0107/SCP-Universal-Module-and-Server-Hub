// modules route - GET returns list of modules (paginated stub)
import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  const modules = await prisma.module.findMany({ take: 100 });
  return NextResponse.json({ modules });
}
