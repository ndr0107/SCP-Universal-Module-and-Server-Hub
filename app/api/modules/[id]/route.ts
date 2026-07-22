import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { getUserFromRequest } from '@/src/lib/auth';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const user = await getUserFromRequest(req);
  if (!user || !user.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const id = params.id;
  const record: any = {};
  if (body.name) record.name = body.name;
  if (body.description) record.description = body.description;
  if (body.author) record.author = body.author;
  if (body.version) record.version = body.version;
  if (body.status) record.status = body.status;
  if (body.categoryId !== undefined) {
    if (body.categoryId === null) record.categories = { set: [] };
    else record.categories = { set: [{ id: body.categoryId }] };
  }
  if (body.cooldownTime !== undefined) record.cooldownTime = body.cooldownTime;
  if (body.cooldownUnit !== undefined) record.cooldownUnit = body.cooldownUnit;
  if (body.cooldownScope !== undefined) record.cooldownScope = body.cooldownScope;
  if (body.maxPlayers !== undefined) record.maxPlayers = body.maxPlayers;
  if (body.playerTagName !== undefined) record.playerTagName = body.playerTagName;

  await prisma.module.update({ where: { id }, data: record });
  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const user = await getUserFromRequest(req);
  if (!user || !user.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const id = params.id;
  await prisma.module.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
