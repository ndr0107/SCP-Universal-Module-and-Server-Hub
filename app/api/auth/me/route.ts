// me route: GET -> return user info if session cookie valid
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/src/lib/prisma';

export async function GET(req: Request) {
  const cookie = req.headers.get('cookie') || '';
  const match = cookie.split(';').map(s=>s.trim()).find(s=>s.startsWith('session='));
  if (!match) return NextResponse.json({ user: null });
  const token = match.split('=')[1];
  try {
    const payload: any = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) return NextResponse.json({ user: null });
    return NextResponse.json({ user: { id: user.id, email: user.email, isAdmin: user.isAdmin } });
  } catch (e) {
    return NextResponse.json({ user: null });
  }
}
