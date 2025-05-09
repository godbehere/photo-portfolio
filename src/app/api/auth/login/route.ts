import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/firebaseAdmin';

export async function POST(req: NextRequest) {
  const { idToken } = await req.json();

  try {
    // Verify the token and check for admin claim
    const decodedIdToken = await getAuth.verifyIdToken(idToken);

    if (!decodedIdToken.admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Create session cookie
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await getAuth.createSessionCookie(idToken, { expiresIn });

    const response = NextResponse.json({ success: true });
    response.cookies.set('__session', sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: expiresIn / 1000,
      path: '/',
    });

    return response;
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
