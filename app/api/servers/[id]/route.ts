import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { getUserFromRequest } from '@/src/lib/auth';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const user = await getUserFromRequest(req);
  if (!user || !user.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const id = params.id;
  await prisma.server.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
