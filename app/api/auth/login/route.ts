// login route: POST { email, password } -> set JWT cookie
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '@/src/lib/prisma';

function createCookie(token: string) {
  return `session=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax`;
}

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;
  if (!email || !password) return NextResponse.json({ error: 'Missing' }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  const token = jwt.sign({ sub: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' });
  const res = NextResponse.json({ ok: true });
  res.headers.set('Set-Cookie', createCookie(token));
  return res;
}
