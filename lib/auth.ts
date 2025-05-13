import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in your environment variables');
}

export function signToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d',
  });
}

type TokenPayload = {
  id: string;
  email?: string;
  username?: string;
};

export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as TokenPayload;
  } catch (error) {
    console.error('JWT verification error:', error);
    return null;
  }
}

export async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return { error: 'Unauthorized', status: 401 };

  const decoded = verifyToken(token);
  if (!decoded) return { error: 'Invalid token', status: 401 };

  return {
    userId: decoded.id,
    email: decoded.email,
    username: decoded.username,
  };
}
