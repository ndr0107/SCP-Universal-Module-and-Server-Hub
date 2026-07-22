import jwt from 'jsonwebtoken';
import { prisma } from './prisma';

export async function getUserFromRequest(req: Request) {
  const cookie = req.headers.get('cookie') || '';
  const match = cookie.split(';').map(s => s.trim()).find(s => s.startsWith('session='));
  if (!match) return null;
  const token = match.split('=')[1];
  try {
    const payload: any = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    return user ? { id: user.id, email: user.email, isAdmin: user.isAdmin } : null;
  } catch (e) {
    return null;
  }
}
