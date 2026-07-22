import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { getUserFromRequest } from '@/src/lib/auth';

export async function POST(req: Request) {
  const user = await getUserFromRequest(req);
  if (!user || !user.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const { serverId, moduleId, currentPlayers } = body;
  if (!serverId || !moduleId || currentPlayers === undefined) return NextResponse.json({ error: 'Missing' }, { status: 400 });

  const existing = await prisma.serverModulePlayer.findFirst({ where: { serverId, moduleId } });
  if (existing) {
    await prisma.serverModulePlayer.update({ where: { id: existing.id }, data: { currentPlayers } });
    return NextResponse.json({ success: true, id: existing.id });
  }
  const rec = await prisma.serverModulePlayer.create({ data: { serverId, moduleId, currentPlayers } });
  return NextResponse.json({ success: true, id: rec.id });
}
