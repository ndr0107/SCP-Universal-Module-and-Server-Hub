import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { getUserFromRequest } from '@/src/lib/auth';

export async function GET() {
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
  return NextResponse.json({ categories });
}

export async function POST(req: Request) {
  const user = await getUserFromRequest(req);
  if (!user || !user.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const { name, color } = body;
  if (!name) return NextResponse.json({ error: 'Missing' }, { status: 400 });
  const rec = await prisma.category.create({ data: { name, color: color ?? 'purple' } });
  return NextResponse.json({ id: rec.id, success: true });
}
