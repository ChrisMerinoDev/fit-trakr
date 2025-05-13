import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = cookies();

  // Clear the token cookie
  (await cookieStore).set({
    name: 'token',
    value: '',
    path: '/',
    maxAge: 0,
  });

  return NextResponse.json({ message: 'Logged out successfully' });
}
