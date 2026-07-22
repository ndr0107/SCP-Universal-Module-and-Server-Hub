// invite route: POST { token, email, password }
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/src/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();
  const { token, email, password } = body;
  if (!token || !email || !password) return NextResponse.json({ error: 'Missing' }, { status: 400 });
  if (token !== process.env.ADMIN_INVITE_SECRET) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ error: 'User exists' }, { status: 409 });

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password: hashed, isAdmin: true } });

  return NextResponse.json({ ok: true, user: { id: user.id, email: user.email } });
}
