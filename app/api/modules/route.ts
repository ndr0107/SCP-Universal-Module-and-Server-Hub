import { prisma } from '@/src/lib/prisma';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/src/lib/auth';

export async function GET() {
  const modules = await prisma.module.findMany({
    include: { },
    orderBy: { submittedAt: 'desc' },
    take: 500,
  });
  return NextResponse.json({ modules });
}

export async function POST(req: Request) {
  // public submit
  const body = await req.json();
  const { name, description, author, version, categoryId, cooldownTime, cooldownUnit, cooldownScope, maxPlayers, playerTagName } = body;
  if (!name || !description || !author || !version) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  const record: any = {
    name,
    description,
    author,
    version,
    status: 'Pending',
    cooldownTime: cooldownTime ?? null,
    cooldownUnit: cooldownUnit ?? null,
    cooldownScope: cooldownScope ?? null,
    maxPlayers: maxPlayers ?? null,
    playerTagName: playerTagName ?? null,
  };
  if (categoryId) {
    // connect to category if exists
    record.categories = { connect: { id: categoryId } };
  }
  const created = await prisma.module.create({ data: record });
  return NextResponse.json({ id: created.id, success: true });
}
