import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { getUserFromRequest } from '@/src/lib/auth';

export async function GET() {
  const servers = await prisma.server.findMany({
    include: {
      modules: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 500,
  });

  // attach player tags
  const playerTags = await prisma.serverModulePlayer.findMany();
  const tagsByServer = new Map<string, any[]>();
  for (const pt of playerTags) {
    if (!tagsByServer.has(pt.serverId)) tagsByServer.set(pt.serverId, []);
    tagsByServer.get(pt.serverId)!.push(pt);
  }

  const result = servers.map(s => ({
    ...s,
    playerTags: (tagsByServer.get(s.id) || []).map(p => ({ id: p.id, moduleId: p.moduleId, currentPlayers: p.currentPlayers }))
  }));

  return NextResponse.json({ servers: result });
}

export async function POST(req: Request) {
  const user = await getUserFromRequest(req);
  if (!user || !user.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const { name, description, moduleIds } = body;
  if (!name) return NextResponse.json({ error: 'Missing' }, { status: 400 });
  const data: any = { name, description: description ?? '' };
  if (Array.isArray(moduleIds) && moduleIds.length > 0) {
    data.modules = { connect: moduleIds.map((id: string) => ({ id })) };
  }
  const rec = await prisma.server.create({ data });
  return NextResponse.json({ id: rec.id, success: true });
}
